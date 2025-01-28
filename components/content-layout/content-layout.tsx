'use client'

import {
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { ContentLayoutProps } from '@/components/content-layout/content-layout.type'
import { PAGE_NAME } from '@/constants/index'
import { dashboardHomeImage } from '@/assets/images'
import { cn } from '@/lib/utils'
import { ModeToggle } from '@/components/mode-toggle'

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
        <header className='flex flex-1 z-50 items-center justify-between sticky top-0 border-b py-5 px-5 bg-background/70 backdrop-blur-2xl'>
          <div className='flex items-center'>
            <SidebarTrigger className='w-9 h-9' />

            <Separator
              orientation='vertical'
              className='mx-2 h-4'
            />

            <h2 className='text-sm font-bold'>{title}</h2>
          </div>

          <ModeToggle />
        </header>
      )}

      {!showHeaderAndFooter && <Background />}

      <div
        className={cn(
          'relative p-8 w-[1240px] max-w-full mx-auto space-y-5',
          showHeaderAndFooter ? 'min-h-[calc(100dvh_-_8.5rem)] ' : 'min-h-dvh'
        )}
      >
        {children}
      </div>

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

function Background() {
  return (
    <div
      className='absolute inset-0'
      style={{
        backgroundImage: `url(${dashboardHomeImage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      }}
    ></div>
  )
}
