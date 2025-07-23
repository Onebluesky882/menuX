import { InferInsertModel } from 'drizzle-orm';
import { customers } from 'src/database';

export type CustomerDto = InferInsertModel<typeof customers>;
