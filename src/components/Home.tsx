import { authClient } from '../auth-client'

export default function Home() {
  const { data: session } = authClient.useSession()
  if (!session?.user) return null
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Welcome</h2>
      <p className="text-sm text-gray-500">{session.user.email}</p>
      <div className="border p-4 rounded">Protected content coming soon.</div>
    </div>
  )
}
