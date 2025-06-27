import { randomBytes } from 'crypto'
import { db } from '../db'
import { invitations } from '../db/schema'
import { getUser } from '../auth'

async function requireAdmin(req: Request) {
  const user = await getUser(req)
  if (!user?.isAdmin) throw new Response('Unauthorized', { status: 401 })
}

export async function createCode(req: Request) {
  await requireAdmin(req)
  const code = randomBytes(4).toString('hex')
  await db.insert(invitations).values({ code })
  return Response.json({ code })
}

export async function listCodes(req: Request) {
  await requireAdmin(req)
  const rows = await db.select().from(invitations)
  return Response.json(rows)
}
