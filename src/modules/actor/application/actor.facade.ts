import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';

@Injectable()
export class ActorFacade {
  constructor(
    private readonly CommandBus: CommandBus,
    private readonly QueryBus: QueryBus,
    private readonly EventBus: EventBus,
  ) {}

  commands = {
    createActor: (actor: CreateUserDTO) => this.createActor(actor),
  };
  queries = {
    getActor: (id: number) => this.getActor(id),
    getActors: (dto: GetUsersDTO) => this.getActors(dto),
  };
  events = {};

  private createUser(user: CreateUserDTO) {
    return this.CommandBus.execute<CreateUserCommand, UserAggregate>(
      new CreateUserCommand(user),
    );
  }

  //update
  //delete

  private getUser(id: number) {
    return this.QueryBus.execute<GetUserQuery, UserAggregate>(
      new GetUserQuery(id),
    );
  }

  private getUsers(dto: GetUsersDTO) {
    return this.QueryBus.execute<
      GetUsersQuery,
      { data: UserAggregate[]; total: number }
    >(new GetUsersQuery(dto));
  }
}
