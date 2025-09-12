// database.module.ts
import {
  Inject,
  Injectable,
  Logger,
  Module,
  OnModuleDestroy,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { DATABASE_CONNECTION } from './database-connection';
import { schema } from './schema';

@Injectable()
export class DatabaseHealthService {
  constructor(@Inject('DB_POOL') private readonly pool: Pool) {}

  async checkHealth(): Promise<boolean> {
    try {
      const client = await this.pool.connect();
      await client.query('SELECT 1');
      client.release();
      return true;
    } catch {
      return false;
    }
  }
}

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'DB_POOL',
      useFactory: (configService: ConfigService) => {
        const logger = new Logger('DatabasePool');
        const pool = new Pool({
          connectionString: configService.getOrThrow('DATABASE_URL'),
          max: configService.get<number>('DB_POOL_MAX', 20),
          idleTimeoutMillis: configService.get<number>(
            'DB_IDLE_TIMEOUT',
            30000,
          ),
          connectionTimeoutMillis: configService.get<number>(
            'DB_CONN_TIMEOUT',
            10000,
          ),
          application_name: 'nestjs_app',
          keepAlive: true,
        });

        pool.on('error', (err) =>
          logger.error('Unexpected error on idle client', err),
        );

        return pool;
      },
      inject: [ConfigService],
    },
    {
      provide: DATABASE_CONNECTION,
      useFactory: (pool: Pool) => drizzle(pool, { schema }),
      inject: ['DB_POOL'],
    },
    DatabaseHealthService,
  ],
  exports: [DATABASE_CONNECTION, DatabaseHealthService],
})
export class DatabaseModule implements OnModuleDestroy {
  private readonly logger = new Logger(DatabaseModule.name);

  constructor(@Inject('DB_POOL') private readonly pool: Pool) {}

  async onModuleDestroy() {
    this.logger.log('Closing database pool...');
    await this.pool.end();
    this.logger.log('Database pool closed ✅');
  }
}
