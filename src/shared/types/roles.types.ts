type RawRoleType = 'admin' | 'creator' | 'simpleton' | 'affiliate';

function createRoleSymbol(role: RawRoleType): Role {
  return { type: role };
}

export interface Role {
  type: RawRoleType;
}

export const ADMIN_ROLE = createRoleSymbol('admin');
export const CREATOR_ROLE = createRoleSymbol('creator');
export const SIMPLETON_ROLE = createRoleSymbol('simpleton');
export const AFFILIATE_ROLE = createRoleSymbol('affiliate');
