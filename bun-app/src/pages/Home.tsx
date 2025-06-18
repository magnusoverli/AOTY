import { useEffect, useState } from 'react'
import { Button } from '../components/ui/button'
import Layout from '../components/layout'

export default function Home() {
  const [session, setSession] = useState<{ user?: { email: string } } | null>(null)

  useEffect(() => {
    fetch('/api/auth/session').then(res => res.ok ? res.json() : null).then(setSession)
  }, [])

  const [email, setEmail] = useState('')

  const requestMagic = async () => {
    await fetch('/api/auth/sign-in/magic-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    alert('Check your email for the magic link')
  }

  return (
    <Layout>
      {session?.user ? (
        <div>
          <p>Signed in as {session.user.email}</p>
          <Button asChild><a href="/api/auth/sign-out">Sign out</a></Button>
        </div>
      ) : (
        <div className="space-y-2">
          <input value={email} onChange={e => setEmail(e.target.value)} className="border p-2" placeholder="Email" />
          <Button onClick={requestMagic}>Send Magic Link</Button>
        </div>
      )}
    </Layout>
  )
}
