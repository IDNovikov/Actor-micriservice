import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateActorCommand } from './create-actor.command';
import { ActorAggregate } from 'src/modules/actor/domain';
import { ActorRepository } from 'src/modules/actor/providers';
import { ConflictException } from '@nestjs/common';

@CommandHandler(CreateActorCommand)
export class CreateActorHandler implements ICommandHandler<
  CreateActorCommand,
  ActorAggregate
> {
  constructor(private readonly actorRepository: ActorRepository) {}

  async execute({ dto }: CreateActorCommand): Promise<ActorAggregate> {
    const actor = ActorAggregate.create(dto);

    const existingActor = await this.actorRepository.findById(actor.id);

    if (actor.id === existingActor?.id) {
      throw new ConflictException(`Actor already created`);
    }
    const created = await this.actorRepository.save(actor);
    return created;
  }
}
