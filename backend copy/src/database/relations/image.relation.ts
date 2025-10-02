import { relations } from 'drizzle-orm';
import { images, menus, shops, user } from '../schema';

// เพิ่ม relation สำหรับ images table
export const imageRelations = relations(images, ({ one }) => ({
  menu: one(menus, {
    fields: [images.menuId],
    references: [menus.id],
    relationName: 'menuImages', // ต้องตรงกับใน menuRelations
  }),
  shop: one(shops, {
    fields: [images.shopId],
    references: [shops.id],
  }),
  user: one(user, {
    fields: [images.userId],
    references: [user.id],
  }),
}));
