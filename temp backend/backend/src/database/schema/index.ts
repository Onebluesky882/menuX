import { user } from './tables/auth-user';
import { images } from './tables/images';
import { lineUser } from './tables/lineUser';
import { menuOptions } from './tables/menuOptions';
import { menus } from './tables/menus';
import { orderItems } from './tables/orderItems';
import { orders } from './tables/orders';
import { orderTable } from './tables/orderTable';
import { shops } from './tables/shops';
import { shopTables } from './tables/shopTables';
import { slipVerifications } from './tables/slipVerifications';
import { tableGridLayout } from './tables/tableGridsLayout';

export * from './tables/auth-user';
export * from './tables/images';
export * from './tables/lineUser';
export * from './tables/menuOptions';
export * from './tables/menus';
export * from './tables/orderItems';
export * from './tables/orders';
export * from './tables/orderTable';
export * from './tables/shops';
export * from './tables/shopTables';
export * from './tables/slipVerifications';
export * from './tables/tableGridsLayout';

export * from '../relations/image.relation';
export * from '../relations/menu.relation';
export * from '../relations/orders.relation';
export * from '../relations/owner.relation';

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
