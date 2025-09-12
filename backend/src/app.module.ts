import { AuthGuard, AuthModule } from '@mguay/nestjs-better-auth';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DatabaseModule } from './database/database.module';
import { DATABASE_CONNECTION } from './database/DATABASE_CONNECTION';

@Module({
  imports: [
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
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
