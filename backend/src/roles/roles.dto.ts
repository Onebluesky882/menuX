import { InferInsertModel } from 'drizzle-orm';
import { roles } from '../database';

export type InsertRoles = InferInsertModel<typeof roles>;

export type RolesDto = Pick<InsertRoles, 'name' | 'shopId'>;
