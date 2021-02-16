import { applyDecorators, SetMetadata } from '@nestjs/common';
import { Role } from '../types/roles.types';

export function AddRoles(roles: Role[]) {
  return applyDecorators(SetMetadata('roles@guard', roles));
}
