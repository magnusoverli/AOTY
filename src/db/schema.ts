import { pgTable, text, boolean } from 'drizzle-orm/pg-core'

export const invitations = pgTable('invitations', {
  code: text('code').primaryKey(),
  used: boolean('used').notNull().default(false),
})

export const users = pgTable('users', {
  email: text('email').primaryKey(),
  isAdmin: boolean('is_admin').notNull().default(false),
})
