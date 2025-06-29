import { useLogto } from '@logto/react'
import { Button } from './ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from './ui/sidebar'
import { List, ChevronRight, ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function AppSidebar() {
  const { userInfo, signOut } = useLogto()
  if (!userInfo) return null
  const COOKIE = 'lists_open'
  const read = () => {
    const c = document.cookie.split('; ').find(v => v.startsWith(COOKIE + '='))
    return c ? c.split('=')[1] === 'true' : false
  }
  const [open, setOpen] = useState(false)
  useEffect(() => {
    setOpen(read())
  }, [])
  useEffect(() => {
    document.cookie = `${COOKIE}=${open}; path=/; max-age=${60 * 60 * 24 * 7}`
  }, [open])
  return (
    <Sidebar>
      <SidebarContent>
        <button
          onClick={() => setOpen(v => !v)}
          className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-muted"
        >
          <span className="flex items-center gap-2">
            <List className="size-4" /> Lists
          </span>
          {open ? (
            <ChevronDown className="size-4" />
          ) : (
            <ChevronRight className="size-4" />
          )}
        </button>
        {open && (
          <div className="ml-6 mt-1 space-y-1 text-sm">
            <a href="#" className="block px-3 py-1 rounded hover:bg-muted">
              List 1
            </a>
            <a href="#" className="block px-3 py-1 rounded hover:bg-muted">
              List 2
            </a>
            <a href="#" className="block px-3 py-1 rounded hover:bg-muted">
              List 3
            </a>
          </div>
        )}
        <a href="#" className="block px-3 py-2 rounded hover:bg-muted">Settings</a>
        <a href="#" className="block px-3 py-2 rounded hover:bg-muted">Help</a>
      </SidebarContent>
      <SidebarFooter>
        <Button size="sm" onClick={() => signOut()}>Logout</Button>
        <div className="text-xs text-muted-foreground mt-2">{userInfo.email}</div>
      </SidebarFooter>
    </Sidebar>
  )
}
