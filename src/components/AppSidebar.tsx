import { authClient } from '../auth-client'
import { Button } from './ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from './ui/sidebar'

export default function AppSidebar() {
  const { data: session } = authClient.useSession()
  if (!session?.user) return null
  return (
    <Sidebar>
      <SidebarHeader>
        <span className="font-bold flex-1">Bun App</span>
        <span className="text-xs text-gray-500">{session.user.email}</span>
      </SidebarHeader>
      <SidebarContent>
        <a href="/" className="block px-3 py-2 rounded hover:bg-muted">Dashboard</a>
        <a href="#" className="block px-3 py-2 rounded hover:bg-muted">Settings</a>
        <a href="#" className="block px-3 py-2 rounded hover:bg-muted">Help</a>
      </SidebarContent>
      <SidebarFooter>
        <Button size="sm" onClick={() => authClient.signOut()}>Logout</Button>
      </SidebarFooter>
    </Sidebar>
  )
}
