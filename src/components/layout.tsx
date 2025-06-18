import { ReactNode, useState } from 'react'
import { authClient } from '../auth-client'
import AppSidebar from './AppSidebar'
import { SidebarProvider } from './ui/sidebar'
import { Button } from './ui/button'
import { Settings, Sun, Moon } from 'lucide-react'

export default function Layout({
  children,
  showHeader = true,
}: {
  children: ReactNode
  showHeader?: boolean
}) {
  const { data: session } = authClient.useSession()
  const [dark, setDark] = useState(false)
  const initial = session?.user?.email?.[0]?.toUpperCase() ?? ''
  return (
    <SidebarProvider>
      <div className="min-h-screen flex">
        {session?.user && <AppSidebar />}
        <div className="flex-1 flex flex-col">
          {showHeader && session?.user && (
            <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
              <span className="font-semibold">Bun App</span>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  {initial}
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDark(v => !v)}
                >
                  {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
                </Button>
              </div>
            </header>
          )}
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
