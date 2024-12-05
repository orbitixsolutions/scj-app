'use client'

import {
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { ContentLayoutProps } from '@/components/content-layout/content-layout.type'
import { PAGE_NAME } from '@/constants/index'
import { dashboardHomeImage } from '@/assets/images'
import { cn } from '@/lib/utils'

export function ContentLayout(props: ContentLayoutProps) {
  const { title, children, showHeaderAndFooter = true } = props
  const { open, isMobile } = useSidebar()

  const CURRENT_YEAR = new Date().getFullYear()

  return (
    <SidebarInset
      className={cn(
        'transition-[margin-left] ease-linear duration-200 bg-transparent',
        open ? 'ml-[--sidebar-width]' : 'ml-[0px]',
        isMobile && 'ml-0'
      )}
    >
      {showHeaderAndFooter && (
        <header className='flex flex-1 z-50 items-center sticky top-0 border-b py-5 px-5 bg-background/70 backdrop-blur-2xl'>
          <SidebarTrigger />
          <Separator
            orientation='vertical'
            className='mx-2 h-4'
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
      )}

      <Background>
        <div
          className={cn(
            'relative p-8 md:container mx-auto space-y-5',
            showHeaderAndFooter ? 'min-h-[calc(100dvh_-_8rem)] ' : 'min-h-dvh'
          )}
        >
          {children}
        </div>
      </Background>

      {showHeaderAndFooter && (
        <footer className='flex flex-1 border-t bg-background/70 backdrop-blur-2xl'>
          <div className='mx-4 md:mx-8 flex h-14 items-center'>
            <p className='text-xs md:text-sm leading-loose text-muted-foreground text-left'>
              Admin Panel - {PAGE_NAME} {CURRENT_YEAR}
            </p>
          </div>
        </footer>
      )}
    </SidebarInset>
  )
}

function Background({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        backgroundImage: `url(${dashboardHomeImage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      }}
    >
      {children}
    </div>
  )
}
