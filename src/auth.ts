import { randomUUID } from 'crypto'

interface Session { email: string }
const sessions = new Map<string, Session>()

function getToken(req: Request) {
  const cookie = req.headers.get('cookie') || ''
  return /session=([^;]+)/.exec(cookie)?.[1]
}

export const authRoutes = {
  async login(req: Request) {
    const { email } = await req.json()
    if (!email) return new Response('Email required', { status: 400 })
    const token = randomUUID()
    sessions.set(token, { email })
    return new Response('ok', {
      headers: { 'Set-Cookie': `session=${token}; HttpOnly; Path=/` },
    })
  },
  session(req: Request) {
    const token = getToken(req)
    const user = token ? sessions.get(token) : null
    return Response.json({ user })
  },
  logout(req: Request) {
    const token = getToken(req)
    if (token) sessions.delete(token)
    return new Response('ok', {
      headers: { 'Set-Cookie': 'session=; Max-Age=0; Path=/' },
    })
  },
} as const
