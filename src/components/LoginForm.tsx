import { useState } from 'react'
import { Button } from './ui/button'
import { authClient } from '../auth-client'

async function requestLink(email: string, code: string) {
  const res = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code })
  })
  if (!res.ok) throw new Error((await res.json()).error || 'Error')
}

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const sendLink = async () => {
    if (!email) return
    setLoading(true)
    setError('')
    try {
      await requestLink(email, code)
      setSent(true)
    } catch (e: any) {
      setError(e.message)
    }
    setLoading(false)
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
      <input
        className="border p-2 w-full"
        value={code}
        onChange={e => setCode(e.target.value)}
        placeholder="Invitation Code"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button onClick={sendLink} disabled={loading}>
        {loading ? 'Sending...' : 'Send Magic Link'}
      </Button>
    </div>
  )
}
