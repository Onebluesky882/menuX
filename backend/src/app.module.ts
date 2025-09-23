import { AuthGuard, AuthModule } from '@mguay/nestjs-better-auth';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
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
import { WebsocketGateway } from './websocket-gateway/websocket.gateway';

@Module({
  imports: [
    WebsocketGateway,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule.forRootAsync({
      imports: [DatabaseModule, ConfigModule],
      useFactory: (database: NodePgDatabase, configService: ConfigService) => ({
        auth: betterAuth({
          database: drizzleAdapter(database, {
            provider: 'pg',
          }),
          emailAndPassword: { enabled: true },

          trustedOrigins: [
            configService.getOrThrow('WEB_SERVICE_01'),
            configService.getOrThrow('WEB_SERVICE_02'),
          ],
        }),
      }),
      inject: [DATABASE_CONNECTION, ConfigService],
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
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
