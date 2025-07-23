import { InferInsertModel } from 'drizzle-orm';
import { employees } from '../database';

export type EmployeesDto = InferInsertModel<typeof employees>;
