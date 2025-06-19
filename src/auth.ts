import { betterAuth } from 'better-auth'
import { magicLink } from 'better-auth/plugins/magic-link'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from './db'
import * as schema from './db/schema/auth-schema'
import { config } from 'dotenv'
import sgMail from '@sendgrid/mail'
import { isAllowedDevOrigin } from './lib/dev-origins'

config({ path: './.env' })

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export const auth = betterAuth({
  baseURL: process.env.BASE_URL || 'http://localhost:3000',
  secret: process.env.AUTH_SECRET!,
  trustedOrigins: [process.env.BASE_URL || 'http://localhost:3000'],
  advanced: process.env.NODE_ENV !== 'production'
    ? { disableCSRFCheck: true }
    : undefined,
  hooks: process.env.NODE_ENV !== 'production'
    ? {
        before: async ctx => {
          const origin = ctx.headers.get('origin') || ctx.headers.get('referer') || ''
          if (origin && !isAllowedDevOrigin(origin)) {
            throw new Error('Untrusted origin')
          }
        },
      }
    : undefined,
  database: drizzleAdapter(db, {
    schema: {
      ...schema,
      user: schema.users
    },
    provider: 'pg',
    usePlural: true
  }),
  plugins: [
    magicLink({
      async sendMagicLink({ email, url }) {
        await sgMail.send({
          to: email,
          from: process.env.SENDGRID_FROM!,
          subject: 'Your Magic Link',
          text: `Login using this link: ${url}`,
        })
      },
    }),
  ],
})
