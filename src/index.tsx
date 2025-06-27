import { serve } from "bun";
import index from "./index.html";
import { auth } from "./auth";
import { db } from './db'
import { users, invitationCodes } from './db/schema/auth-schema'
import { eq } from 'drizzle-orm'

const server = serve({
  routes: {
    "/api/auth/*": auth.handler,
    "/api/register": async req => {
      if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 })
      const { email, code } = await req.json()
      if (!email) return Response.json({ error: 'Email required' }, { status: 400 })
      const existing = (await db.select().from(users).where(eq(users.email, email))).at(0)
      if (!existing) {
        const invite = (await db.select().from(invitationCodes)).at(0)
        if (!invite || invite.code !== code) {
          return Response.json({ error: 'Invalid invitation code' }, { status: 400 })
        }
      }
      await auth.signIn.magicLink({ email })
      return Response.json({ ok: true })
    },

    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async req => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});
