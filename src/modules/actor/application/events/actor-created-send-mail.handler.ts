import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ActorCreatedEvent } from '../../domain/events/actor-created.event';
//import { AMQPport } from 'src/modules/core/amqp/amqp.port';

@EventsHandler(ActorCreatedEvent)
export class ActorCreatedSendMailHandler implements IEventHandler<ActorCreatedEvent> {
  constructor() //private readonly amqp: AMQPport
  {}

  async handle(event: ActorCreatedEvent) {
    const text = `This is text message to ${event.actorId}`;
    console.log(text);
    // const isSended = await this.amqp.sendEmailMessage(text);
  }
}
