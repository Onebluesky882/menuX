import { sql } from 'drizzle-orm';
import { numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { orderTable } from './orderTable';
import { shops } from './shops';
import { customers } from './customers';
import { users } from './users';
import { menus } from './menus';
import { randomUUID } from 'crypto';

export const orders = pgTable('orders', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  shopId: uuid('shop_id')
    .notNull()
    .references(() => shops.id),

  orderTableId: uuid('order_table_id').references(() => orderTable.id, {
    onDelete: 'cascade',
  }),
  menuId: uuid('menu_id').references(() => menus.id),
  status: text('status').default('pending'),
  customerId: uuid('customer_id').references(() => customers.id),
  createdById: uuid('create_by_id').references(() => users.id),
  quantity: numeric('quantity', { precision: 10, scale: 2 }),
  totalPrice: numeric('total_price', { precision: 10, scale: 2 }),
  priceEach: numeric('price_each', { precision: 10, scale: 2 }),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  orderType: text('order_type'), // takeaways or dine-in
});
