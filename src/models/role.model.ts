import { model, property } from '@loopback/repository';
import { Permissions } from 'loopback4-authorization';
import { SoftDeleteEntity } from 'loopback4-soft-delete';
import { Permission } from './permissions.enum';

export enum RoleEnum {
  ADMIN = 'Admin',
  SUPER_ADMIN = 'Super Admin',
  SUBSCRIBER = 'Subscriber'
};

@model()
export class Role extends SoftDeleteEntity implements Permissions<string>  {

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
  name: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(RoleEnum),
    },
  })
  key?: RoleEnum;

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
  permissions: Permission[];

  constructor(data?: Partial<Role>) {
    super(data);
  }
}

export interface RoleRelations {
}

export type RoleWithRelations = Role & RoleRelations;
