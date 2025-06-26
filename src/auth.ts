import { db } from './db'
import { invitations, users } from './db/schema'
import { eq } from 'drizzle-orm'

const logto = process.env.LOGTO_ENDPOINT!
const admin = process.env.ADMIN_EMAIL

async function sendMagicLink(email: string) {
  await fetch(logto + '/api/sign-in/email', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, appId: process.env.LOGTO_APP_ID }),
  })
}

export async function getUser(req: Request) {
  const r = await fetch(logto + '/api/userinfo', {
    headers: { cookie: req.headers.get('cookie') ?? '' },
  })
  if (!r.ok) return null
  const info = await r.json()
  const rows = await db.select().from(users).where(eq(users.email, info.email))
  return rows[0] ? { email: info.email, isAdmin: rows[0].isAdmin } : null
}

export const authRoutes = {
  async login(req: Request) {
    const { email, code } = await req.json()
    if (!email) return new Response('Email required', { status: 400 })
    const found = await db.select().from(users).where(eq(users.email, email))
    if (!found.length) {
      if (!code) return Response.json({ needCode: true })
      const inv = await db.select().from(invitations).where(eq(invitations.code, code))
      if (!inv.length || inv[0].used) return new Response('Invalid code', { status: 400 })
      await db.update(invitations).set({ used: true }).where(eq(invitations.code, code))
      await db.insert(users).values({ email, isAdmin: email === admin })
    }
    await sendMagicLink(email)
    return new Response('ok')
  },
  async session(req: Request) {
    const user = await getUser(req)
    return Response.json({ user })
  },
  async logout(req: Request) {
    await fetch(logto + '/api/logout', { headers: { cookie: req.headers.get('cookie') ?? '' } })
    return new Response('ok', { headers: { 'Set-Cookie': 'authorization=; Max-Age=0; Path=/' } })
  },
} as const
