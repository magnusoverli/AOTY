import { ReactNode } from 'react'
import { Button } from './ui/button'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b p-4 flex justify-between">
        <h1 className="font-bold">Bun App</h1>
        <nav>
          <Button asChild>
            <a href="/api/auth/sign-out">Logout</a>
          </Button>
        </nav>
      </header>
      <main className="flex-1 p-4">{children}</main>
    </div>
  )
}
