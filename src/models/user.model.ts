import { belongsTo, Entity, hasOne, model, property } from '@loopback/repository';
import { IAuthClient, IAuthUser } from 'loopback4-authentication';
import { Role, RoleEnum, RoleWithRelations } from './role.model';

@model()
export class User extends Entity implements IAuthClient, IAuthUser {
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

  @belongsTo(() => Role, { keyTo: 'id' })
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

  constructor(data?: Partial<User>) {
    super(data);
  }

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
}

export interface UserRelations {
  role?: RoleWithRelations;
}

export type UserWithRelations = User & UserRelations;
