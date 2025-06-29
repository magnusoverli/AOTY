import { useLogto } from '@logto/react'

export default function Dashboard() {
  const { userInfo } = useLogto()
  if (!userInfo) return null
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Welcome</h2>
      <p className="text-sm text-gray-500">{userInfo.email}</p>
      <div className="border p-4 rounded">Protected content coming soon.</div>
    </div>
  )
}
