import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { account, session, user, verification } from '../database/schema';
export const db = {
  users: user,
  accounts: account,
  sessions: session,
  verification_tokens: verification,
};

export const authAdapter = drizzleAdapter(db, { provider: 'pg' });
