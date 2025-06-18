import { betterAuth } from 'better-auth'
import { magicLink } from 'better-auth/plugins/magic-link'
import { drizzleAdapter } from 'better-auth/adapters/drizzle-adapter'
import { db, users } from './db'
import { config } from 'dotenv'
import nodemailer from 'nodemailer'

config({ path: './.env' })

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export const auth = betterAuth({
  baseURL: process.env.BASE_URL || 'http://localhost:3000',
  secret: process.env.AUTH_SECRET!,
  adapter: drizzleAdapter(db, { schema: { users }, provider: 'pg', usePlural: true }),
  plugins: [
    magicLink({
      async sendMagicLink({ email, url }) {
        await transporter.sendMail({
          from: process.env.SMTP_FROM,
          to: email,
          subject: 'Your Magic Link',
          text: `Login using this link: ${url}`,
        })
      },
    }),
  ],
})
