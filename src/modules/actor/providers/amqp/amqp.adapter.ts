import { Injectable } from '@nestjs/common';
import { RabbitConsumer } from './amqp.port';
import {
  AmqpConnection,
  AmqpConnectionManager,
  RabbitMQModule,
} from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class RabbitPublisher extends RabbitConsumer {
  constructor(private readonly amqp: AmqpConnection) {
    super();
  }

  async AmqpSendMail(payload: any): Promise<void> {
    await this.amqp.publish('mail', 'mail.send', payload);
  }
}
