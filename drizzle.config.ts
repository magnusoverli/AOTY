import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv'
// Import schema for Drizzle type generation
import './src/db/schema'
config({ path: './.env' })

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
