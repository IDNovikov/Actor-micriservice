import { PrismaService } from 'src/modules/core/prisma/prisma.service';
import { ActorRepository, Paginated } from './prisma.port';
import { ActorAggregate } from '../../domain';
import { Prisma } from 'prisma/generated/browser';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaActorRepository extends ActorRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly db: Prisma.TransactionClient,
  ) {
    super();
  }

  async save(actor: ActorAggregate): Promise<ActorAggregate> {
    const row = await this.db.actor.upsert({
      where: { id: actor.id },
      create: {
        id: actor.id,
        author: actor.author,
        createdAt: actor.createdAt,
        updatedAt: actor.updatedAt,
      },
      update: {
        author: actor.author,
        updatedAt: actor.updatedAt,
      },
    });

    return ActorAggregate.restore(row);
  }

  async findById(id: string): Promise<ActorAggregate | null> {
    const row = await this.db.actor.findUnique({ where: { id } });
    return row ? ActorAggregate.restore(row) : null;
  }

  async findAll<TSort extends string>(
    dto: Paginated<TSort>,
  ): Promise<{ data: ActorAggregate[]; total: number }> {
    const {
      page = 1,
      limit = 20,
      sortBy = 'createdAt' as any,
      order = 'desc' as any,
      search,
    } = dto;
    const where: Prisma.ActorWhereInput = search
      ? {
          OR: [{ author: { contains: search, mode: 'insensitive' } }],
        }
      : {};

    const [items, total] = await Promise.all([
      this.db.actor.findMany({
        where,
        orderBy: { [sortBy]: order },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.db.actor.count({ where }),
    ]);

    return { data: items.map(ActorAggregate.restore), total };
  }

  async transaction<T>(fn: (repo: ActorRepository) => Promise<T>): Promise<T> {
    return this.prisma.$transaction(async (tx) => {
      const txRepo = new PrismaActorRepository(this.prisma, tx);
      return fn(txRepo);
    });
  }
}
