import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv'
import * as authSchema from './src/db/schema/auth-schema'
config({ path: './.env' })

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema/**/*.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
