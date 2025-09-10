import { user } from './schema/auth-user';
import { images } from './schema/images';
import { lineUser } from './schema/lineUser';
import { menuOptions } from './schema/menuOptions';
import { menus } from './schema/menus';
import { orderItems } from './schema/orderItems';
import { orders } from './schema/orders';
import { orderTable } from './schema/orderTable';
import { shops } from './schema/shops';
import { shopTables } from './schema/shopTables';
import { slipVerifications } from './schema/slipVerifications';
import { tableGridLayout } from './schema/tableGridsLayout';

export * from './schema/auth-user';
export * from './schema/images';
export * from './schema/lineUser';
export * from './schema/menuOptions';
export * from './schema/menus';
export * from './schema/orderItems';
export * from './schema/orders';
export * from './schema/orderTable';
export * from './schema/shops';
export * from './schema/shopTables';
export * from './schema/slipVerifications';
export * from './schema/tableGridsLayout';

export * from './relations/image.relation';
export * from './relations/menu.relation';
export * from './relations/orders.relation';
export * from './relations/owner.relation';

export const schema = {
  orders,
  shops,
  shopTables,
  orderTable,
  images,
  tableGridLayout,
  menus,
  orderItems,
  lineUser,
  menuOptions,
  slipVerifications,
  user,
};
