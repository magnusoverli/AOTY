import { useEffect, useState } from 'react'

interface Session { user: { email: string } | null }

export const authClient = {
  async logIn(email: string) {
    await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
  },
  async logOut() {
    await fetch('/api/auth/logout', { method: 'POST' })
  },
  useSession() {
    const [data, setData] = useState<Session>()
    useEffect(() => {
      fetch('/api/auth/session').then(r => r.json()).then(setData)
    }, [])
    return { data }
  },
}
