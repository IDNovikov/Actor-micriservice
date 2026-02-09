import { ActorAggregate } from '../../domain';

export abstract class ActorRepository {
  abstract save(actor: ActorAggregate): Promise<boolean>;
  abstract findById(id: string): Promise<ActorAggregate | null>;
  abstract findAll(): Promise<ActorAggregate[] | null>;
}
