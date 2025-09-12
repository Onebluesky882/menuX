import { sql } from 'drizzle-orm';
import { numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { user } from './auth-user';
import { shops } from './shops';
import { shopTables } from './shopTables';

// order_tables – โต๊ะที่สั่งออเดอร์ (1 โต๊ะ = 1 กลุ่มออเดอร์)
export const orderTable = pgTable('order_table', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  shopId: uuid('shop_id').references(() => shops.id),
  tableId: uuid('table_number').references(() => shopTables.id),
  totalPrice: numeric('total_price', { precision: 10, scale: 2 }),
  status: text('status').default('pending'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  token: text('token').unique(),
  createdById: text('create_by_id').references(() => user.id),
  orderCode: text('order_code').unique().notNull(), // for refer bill
});
/* 
order_table
  └── 1 → many orders
             └── 1 → many order_items
*/
