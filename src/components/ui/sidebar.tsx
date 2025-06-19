import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

const COOKIE = 'sidebar_open'
function readCookie() {
  const match = document.cookie.split('; ').find(c => c.startsWith(COOKIE + '='))
  return match ? match.split('=')[1] === 'true' : true
}

interface SidebarCtx { open: boolean; setOpen: (v: boolean | ((v: boolean) => boolean)) => void }
const SidebarContext = createContext<SidebarCtx | null>(null)

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true)
  useEffect(() => { setOpen(readCookie()) }, [])
  useEffect(() => {
    document.cookie = `${COOKIE}=${open}; path=/; max-age=${60 * 60 * 24 * 7}`
  }, [open])
  return <SidebarContext.Provider value={{ open, setOpen }}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error('SidebarProvider missing')
  return ctx
}

export function Sidebar({ children }: { children: ReactNode }) {
  const { open } = useSidebar()
  return (
    <aside
      className={`flex h-full flex-col border-r bg-white overflow-hidden transition-[width] ${
        open ? 'w-64' : 'w-0'
      }`}
    >
      {open && children}
    </aside>
  )
}

export function SidebarHeader({ children }: { children: ReactNode }) {
  return <div className="p-4 border-b flex items-center gap-2">{children}</div>
}

export function SidebarContent({ children }: { children: ReactNode }) {
  return <div className="flex-1 overflow-y-auto p-4 space-y-2">{children}</div>
}

export function SidebarFooter({ children }: { children: ReactNode }) {
  return <div className="p-4 border-t">{children}</div>
}

export function SidebarTrigger() {
  const { setOpen } = useSidebar()
  return (
    <button
      onClick={() => setOpen(o => !o)}
      className="p-2 border rounded hover:bg-gray-100"
    >
      ☰
    </button>
  )
}
