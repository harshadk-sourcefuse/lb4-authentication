import { Getter, inject } from '@loopback/core';
import { BelongsToAccessor, repository } from '@loopback/repository';
import { AuthenticationBindings } from 'loopback4-authentication';
import { SoftCrudRepository } from 'loopback4-soft-delete';
import { PostgresDbDataSource } from '../datasources';
import { ServicesBinders } from '../keys';
import { Role, User, UserRelations } from '../models';
import { PasswordServiceInterface } from '../types';
import { RoleRepository } from './role.repository';

export class UserRepository extends SoftCrudRepository
  <User, typeof User.prototype.id, UserRelations> {

  public readonly role: BelongsToAccessor<Role, typeof Role.prototype.id>;
  constructor(
    @inject('datasources.postgresDB') dataSource: PostgresDbDataSource,
    @repository.getter('RoleRepository')
    roleRepositoryGetter: Getter<RoleRepository>,
    @inject(ServicesBinders.PASSWORD_SERVICE) private passowrdService: PasswordServiceInterface,
    @inject.getter(AuthenticationBindings.CURRENT_USER, {optional: true})
    protected readonly getCurrentUser: Getter<User | undefined>,
  ) {
    super(User, dataSource, getCurrentUser);

    this.role = this.createBelongsToAccessorFor('role', roleRepositoryGetter);
    this.registerInclusionResolver('role', this.role.inclusionResolver);
  }

  async getUserByUsernameAndPasword(username: string, password: string) {
    let user = await this.findOne({
      where: {
        username
      }, 
      include: ["role"]
    });
    if (user && !await this.passowrdService.comparePassword(password, user.password)) {
      user = null;
    }
    return user;
  }
}
