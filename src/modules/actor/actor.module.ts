import { Module } from '@nestjs/common';
import { ActorCreatedSendMailHandler } from './application/events/actor-created-send-mail.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateActorHandler } from './application/commands/create-actor/create-actor.handler';

const EventHandlers = [ActorCreatedSendMailHandler /*, ... */];

@Module({
  imports: [CqrsModule /* ... */],
  providers: [CreateActorHandler, ...EventHandlers],
})
export class ActorModule {}
