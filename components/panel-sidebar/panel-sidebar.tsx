import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { LosPinosLogo } from '@/assets/logos/los-pinos-logo'
import { SIDEBAR_ITEMS } from '@/lib/menu-list'
import { Button } from '@/components/ui/button'
import { handleSignout } from '@/helpers/sign-out'
import Link from 'next/link'

export function PanelSidebar() {
  return (
    <Sidebar className='!border-0'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className='pt-6 pb-2'>
            <Link href='/dashboard'>
              <LosPinosLogo className='w-[175px] max-w-full h-auto mx-auto' />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Administrar</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_ITEMS.sidebarItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button
          onClick={handleSignout}
          variant='secondary'
        >
          Cerrar sesión
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
