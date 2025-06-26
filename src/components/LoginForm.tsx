import { useState } from 'react'
import { Button } from './ui/button'
import { authClient } from '../auth-client'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [needCode, setNeedCode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const sendLink = async () => {
    if (!email) return
    setLoading(true)
    const res = await authClient.logIn(email, needCode ? code : undefined)
    if (res?.needCode) {
      setNeedCode(true)
      setLoading(false)
      return
    }
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
      {needCode && (
        <input
          className="border p-2 w-full"
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder="Invitation Code"
        />
      )}
      <Button onClick={sendLink} disabled={loading}>
        {loading ? 'Sending...' : 'Send Magic Link'}
      </Button>
    </div>
  )
}
