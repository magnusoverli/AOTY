import { useState } from 'react'
import { Button } from '../components/ui/button'
import Layout from '../components/layout'
import { authClient } from '../auth-client'

export default function Home() {
  const { data: session } = authClient.useSession()
  const [email, setEmail] = useState('')

  const requestMagic = async () => {
    await authClient.signIn.magicLink({ email })
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
