export abstract class AMQPport {
  abstract sendEmailMessage(text: string): Promise<boolean>;
}
