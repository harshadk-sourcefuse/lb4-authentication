import { belongsTo, model, property } from '@loopback/repository';
import { IAuthClient, IAuthUser } from 'loopback4-authentication';
import { UserPermission, UserPermissionsOverride } from 'loopback4-authorization';
import { SoftDeleteEntity } from 'loopback4-soft-delete';
import { Permission } from './permissions.enum';
import { Role, RoleWithRelations } from './role.model';

@model()
export class User extends SoftDeleteEntity implements IAuthClient, IAuthUser, UserPermissionsOverride<string> {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
  })
  middleName?: string;

  @property({
    type: 'string',
  })
  lastName?: string;

  @property({
    type: 'string',
    required: true,
    id: true
  })
  email: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
  })
  phoneNumber?: string;

  @property({
    type: 'date',
    default: new Date(),
  })
  createdOn?: string;

  @property({
    type: 'date',
  })
  modifiedOn?: string;

  @belongsTo(() => Role, { name: 'role', keyTo: 'id' })
  roleId: number;

  @property({
    type: 'string',
    required: true,
    id: true
  })
  clientId: string;


  @property({
    type: 'string',
    required: true,
  })
  clientSecret: string;

  @property({
    type: 'string'
  })
  redirectUrl?: string | undefined;

  @property({
    type: 'array',
    itemType: 'string',
    jsonSchema: {
      type: "array",
      items: {
        enum: Object.values(Permission),
      }
    },
  })
  permissions: UserPermission<Permission>[];

  @property({
    type: 'string',
    required: true,
    id: true
  })
  username: string;

  @property({
    type: 'string',
    required: true
  })
  password: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  role?: RoleWithRelations;
}

export type UserWithRelations = User & UserRelations;
