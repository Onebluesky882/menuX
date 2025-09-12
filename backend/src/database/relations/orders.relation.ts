import { relations } from 'drizzle-orm';
import { menuOptions, menus, orderItems, orders, shops } from '../schema';
// หรือจาก '..' แล้วแต่ path

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  menu: one(menus, {
    fields: [orderItems.menuId],
    references: [menus.id],
  }),
  menuOption: one(menuOptions, {
    fields: [orderItems.optionId],
    references: [menuOptions.id],
  }),
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  shop: one(shops, {
    fields: [orders.shopId],
    references: [shops.id],
  }),
  orderItems: many(orderItems),
}));
