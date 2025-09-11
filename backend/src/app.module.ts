import { AuthGuard, AuthModule } from '@mguay/nestjs-better-auth';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from './database/database-connection';
import { DatabaseModule } from './database/database.module';
import { ImagesModule } from './images/images.module';
import { LineUsersModule } from './line_users/line_users.module';
import { MenuOptionsModule } from './menu_options/menu_options.module';
import { MenusModule } from './menus/menus.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { OrderTableModule } from './order-table/order-table.module';
import { OrdersModule } from './orders/orders.module';
import { R2Module } from './r2/r2.module';
import { ShopsModule } from './shops/shops.module';
import { SlipVerificationsModule } from './slip-verifications/slip-verifications.module';
import { TableGridLayoutModule } from './table-grid-layout/table-grid-layout.module';
import { TablesModule } from './tables/tables.module';
import { UsersModule } from './users/users.module';
import { WebsocketGateway } from './websocket/websocket.gateway';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ScheduleModule.forRoot(), // ต้องมาก่อน DatabaseModule
    DatabaseModule,
    AuthModule.forRootAsync({
      imports: [DatabaseModule],
      useFactory: (database: NodePgDatabase) => {
        return {
          auth: betterAuth({
            database: drizzleAdapter(database, {
              provider: 'pg',
            }),
          }),
        };
      },
      inject: [DATABASE_CONNECTION],
    }),
    TablesModule,
    ImagesModule,
    OrdersModule,
    TableGridLayoutModule,
    MenusModule,
    OrderTableModule,
    OrderItemsModule,
    LineUsersModule,
    ShopsModule,
    R2Module,
    MenuOptionsModule,
    SlipVerificationsModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    WebsocketGateway,
  ],
})
export class AppModule {}
