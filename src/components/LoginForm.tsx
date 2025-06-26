import { useState } from 'react'
import { Button } from './ui/button'
import { authClient } from '../auth-client'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const sendLink = async () => {
    if (!email) return
    setLoading(true)
    await authClient.logIn(email)
    setLoading(false)
    setSent(true)
  }
  if (sent) return <p className="p-2">Check your email to log in.</p>
  return (
    <div className="space-y-2 max-w-sm">
      <input
        className="border p-2 w-full"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <Button onClick={sendLink} disabled={loading}>
        {loading ? 'Sending...' : 'Send Magic Link'}
      </Button>
    </div>
  )
}
