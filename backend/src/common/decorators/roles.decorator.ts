import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

export type Role = 'owner' | 'manager' | 'staff' | 'customer' | 'guest';
