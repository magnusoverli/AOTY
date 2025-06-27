import { randomBytes } from 'crypto'
import { db } from '../src/db'
import { invitationCodes } from '../src/db/schema/auth-schema'

const code = randomBytes(4).toString('hex')
await db.delete(invitationCodes).execute()
await db.insert(invitationCodes).values({ code }).execute()
console.log(code)
