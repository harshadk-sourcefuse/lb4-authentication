import { Getter, inject } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository, repository } from '@loopback/repository';
import { PostgresDbDataSource } from '../datasources';
import { ServicesBinders } from '../keys';
import { Role, User, UserRelations } from '../models';
import { PasswordServiceInterface } from '../types';
import { RoleRepository } from './role.repository';

export class UserRepository extends DefaultCrudRepository
  <User, typeof User.prototype.id, UserRelations> {

  public readonly role: BelongsToAccessor<Role, typeof Role.prototype.id>;
  constructor(
    @inject('datasources.postgresDB') dataSource: PostgresDbDataSource,
    @repository.getter('RoleRepository')
    roleRepositoryGetter: Getter<RoleRepository>,
    @inject(ServicesBinders.PASSWORD_SERVICE) private passowrdService: PasswordServiceInterface,
  ) {
    super(User, dataSource);

    this.role = this.createBelongsToAccessorFor('role', roleRepositoryGetter);
    this.registerInclusionResolver('customer', this.role.inclusionResolver);
  }

  async getUserByUsernameAndPasword(username: string, password: string) {
    let user = await this.findOne({
      where: {
        username
      }
    });
    if (user && !await this.passowrdService.comparePassword(password, user.password)) {
      user = null;
    }
    return user;
  }
}
