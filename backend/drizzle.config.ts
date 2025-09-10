import * as dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';
import { parse } from 'pg-connection-string';

dotenv.config();

const config = parse(process.env.DATABASE_URL!);

export default defineConfig({
  schema: './src/database/schema', // path ของ schema files
  out: './drizzle', // path สำหรับ migration files
  dialect: 'postgresql',
  dbCredentials: {
    host: config.host!,
    port: config.port ? parseInt(config.port) : 5432,
    user: config.user!,
    password: config.password!,
    database: config.database!,
    ssl: { rejectUnauthorized: false },
  },
});
