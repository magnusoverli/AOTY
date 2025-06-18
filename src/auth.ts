import { betterAuth } from 'better-auth'
import { magicLink } from 'better-auth/plugins/magic-link'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from './db'
import * as schema from '../auth-schema'
import { config } from 'dotenv'
import sgMail from '@sendgrid/mail'

config({ path: './.env' })

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export const auth = betterAuth({
  baseURL: process.env.BASE_URL || 'http://localhost:3000',
  secret: process.env.AUTH_SECRET!,
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
