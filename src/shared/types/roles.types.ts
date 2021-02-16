export enum RoleTypes {
  ADMIN = 'ADMIN@ROLE',
  CREATOR = 'CREATOR@ROLE',
  SIMPLETON = 'SIMPLETON@ROLE',
  AFFILIATE = 'AFFILIATE@ROLE',
}

export interface Role {
  type: RoleTypes;
  priority?: number;
}

function createRoleSymbol(roleObject: Role | RoleTypes): Role {
  if (typeof roleObject === 'string') return { type: roleObject };
  return roleObject;
}

export const ADMIN_ROLE = createRoleSymbol(RoleTypes.ADMIN);
export const CREATOR_ROLE = createRoleSymbol(RoleTypes.CREATOR);
export const SIMPLETON_ROLE = createRoleSymbol(RoleTypes.SIMPLETON);
export const AFFILIATE_ROLE = createRoleSymbol(RoleTypes.AFFILIATE);
