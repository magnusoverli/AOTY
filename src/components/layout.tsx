import { ReactNode } from 'react'
import { authClient } from '../auth-client'
import AppSidebar from './AppSidebar'
import { SidebarProvider, SidebarTrigger } from './ui/sidebar'

export default function Layout({
  children,
  showHeader = true,
}: {
  children: ReactNode
  showHeader?: boolean
}) {
  const { data: session } = authClient.useSession()
  return (
    <SidebarProvider>
      <div className="min-h-screen flex">
        {session?.user && <AppSidebar />}
        <div className="flex-1 flex flex-col">
          {showHeader && session?.user && (
            <header className="md:hidden border-b p-4 flex justify-between">
              <SidebarTrigger />
            </header>
          )}
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
