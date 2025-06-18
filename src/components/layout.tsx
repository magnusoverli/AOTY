import { ReactNode } from 'react'
import { Button } from './ui/button'
import { authClient } from '../auth-client'

export default function Layout({
  children,
  showHeader = true,
}: {
  children: ReactNode
  showHeader?: boolean
}) {
  const { data: session } = authClient.useSession()
  return (
    <div className="min-h-screen flex flex-col">
      {showHeader && session?.user && (
        <header className="border-b p-4 flex justify-between">
          <h1 className="font-bold">Bun App</h1>
          <Button onClick={() => authClient.signOut()}>Logout</Button>
        </header>
      )}
      <main className="flex-1 p-4">{children}</main>
    </div>
  )
}
