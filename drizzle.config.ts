import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv'
import * as authSchema from './auth-schema'
config({ path: './.env' })

export default defineConfig({
  out: './drizzle',
  schema: {
    ...authSchema
  },
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
