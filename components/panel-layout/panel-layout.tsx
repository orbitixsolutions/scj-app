'use client'

import { SidebarProvider } from '@/components/ui/sidebar'
import { PanelSidebar } from '@/components/panel-sidebar'
import { useStore } from '@/stores/use-store'
import { useSidebarToggle } from '@/stores/use-sidebar-toggle'

export function PanelLayout({ children }: { children: React.ReactNode }) {
  const sidebarHook = useStore(useSidebarToggle, (state) => state)
  if (!sidebarHook) return null

  return (
    <SidebarProvider
      open={sidebarHook.isOpen}
      onOpenChange={sidebarHook.setIsOpen}
      className='!border-[#000]'
    >
      <PanelSidebar />

      {children}
    </SidebarProvider>
  )
}
