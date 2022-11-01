import { Getter, inject } from '@loopback/core';
import { BelongsToAccessor } from '@loopback/repository';
import { AuthenticationBindings, IAuthUser } from 'loopback4-authentication';
import { SoftCrudRepository } from 'loopback4-soft-delete';
import { PostgresDbDataSource } from '../datasources';
import { Role, RoleRelations, User } from '../models';

export class RoleRepository extends SoftCrudRepository<
  Role,
  typeof Role.prototype.id,
  RoleRelations
> {
  public readonly user: BelongsToAccessor<User, typeof User.prototype.id>;

  constructor(
    @inject('datasources.postgresDB') dataSource: PostgresDbDataSource,
    @inject.getter(AuthenticationBindings.CURRENT_USER, { optional: true })
    protected readonly getCurrentUser: Getter<IAuthUser | undefined>,
  ) {
    super(Role, dataSource, getCurrentUser);

  }
}
