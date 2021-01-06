import { applyDecorators, SetMetadata } from '@nestjs/common';

export function AddRoles(roles: 'user' | 'admin' | 'user|admin') {
  return applyDecorators(SetMetadata('roles', roles.split('|')));
}
