import { useEffect, useState } from 'react'
import Layout from '../components/layout'
import { Button } from '../components/ui/button'
import { authClient } from '../auth-client'

export default function Admin() {
  const { data: session } = authClient.useSession()
  const [codes, setCodes] = useState<{ code: string; used: boolean }[]>([])
  const load = () =>
    fetch('/api/invitations').then(r => r.json()).then(setCodes)
  useEffect(() => { if (session?.user?.isAdmin) load() }, [session])
  if (!session?.user) return <Layout>Login first.</Layout>
  if (!session.user.isAdmin) return <Layout>Not authorized.</Layout>
  const create = async () => {
    const r = await fetch('/api/invitations', { method: 'POST' })
    if (r.ok) load()
  }
  return (
    <Layout>
      <div className="space-y-2 max-w-md">
        <Button onClick={create}>Generate New Code</Button>
        <table className="w-full border text-sm">
          <thead><tr><th>Code</th><th>Used</th></tr></thead>
          <tbody>
            {codes.map(c => (
              <tr key={c.code} className="border-t">
                <td className="p-1 font-mono">{c.code}</td>
                <td className="p-1">{c.used ? 'yes' : 'no'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}
