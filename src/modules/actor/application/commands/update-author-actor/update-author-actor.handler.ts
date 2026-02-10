import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ActorAggregate } from 'src/modules/actor/domain';
import { ActorRepository } from 'src/modules/actor/providers';
import { ConflictException } from '@nestjs/common';
import { UpdateActorAuthCommand } from './update-author-actor.command';

@CommandHandler(UpdateActorAuthCommand)
export class CreateActorHandler implements ICommandHandler<
  UpdateActorAuthCommand,
  ActorAggregate
> {
  constructor(private readonly actorRepository: ActorRepository) {}

  async execute({ dto }: UpdateActorAuthCommand): Promise<ActorAggregate> {
    const actor = ActorAggregate.create(dto);
    actor.updateAuthor(dto.author);
    return await this.actorRepository.save(actor);
  }
}
