import { relations } from 'drizzle-orm';
import { user } from '..';
import { images } from '../schema/images';
import { menus } from '../schema/menus';
import { shops } from '../schema/shops';

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
