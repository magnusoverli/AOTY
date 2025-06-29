import { ReactNode, useEffect, useState } from 'react'
import { useLogto } from '@logto/react'
import AppSidebar from './AppSidebar'
import { SidebarProvider, SidebarTrigger } from './ui/sidebar'
import { Button } from './ui/button'
import { Settings, Sun, Moon } from 'lucide-react'

export default function Layout({
  children,
  showHeader = true,
}: {
  children: ReactNode
  showHeader?: boolean
}) {
  const { isAuthenticated, userInfo } = useLogto()
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem('dark-mode')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const enabled = saved ? saved === 'true' : prefersDark
    document.documentElement.classList.toggle('dark', enabled)
    return enabled
  })
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('dark-mode', String(dark))
  }, [dark])
  const initial = userInfo?.email?.[0]?.toUpperCase() ?? ''
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col">
        {showHeader && isAuthenticated && (
          <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <span className="font-semibold">Bun App</span>
            </div>
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
                aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
                onClick={() => setDark(v => !v)}
              >
                {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </Button>
            </div>
          </header>
        )}
        <div className="flex flex-1">
          {isAuthenticated && <AppSidebar />}
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
