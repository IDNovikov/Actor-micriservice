export class ActorAuthorUpdatedEvent {
  constructor(
    public readonly author: string,
    public readonly at: string,
  ) {}
}
