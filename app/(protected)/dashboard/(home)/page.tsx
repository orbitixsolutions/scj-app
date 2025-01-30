import { ContentLayout } from '@/components/content-layout'
import { ModeToggle } from '@/components/mode-toggle'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { currentUser } from '@/lib/auth'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Inicio',
}

export default async function DashboardHomePage() {
  const SESSION = await currentUser()

  return (
    <ContentLayout
      title='Inicio'
      showHeaderAndFooter={false}
    >
      <div className='absolute inset-0 size-full grid place-items-center'>
        <header className='absolute right-6 md:right-12 top-6 md:top-12 z-50 space-x-4'>
          <SidebarTrigger variant='outline' />
          <ModeToggle />
        </header>

        <h2 className='text-[60px] md:text-[120px] font-medium text-center text-balance font-mermaid text-white px-12'>
          Hola {SESSION?.name}
        </h2>
      </div>
    </ContentLayout>
  )
}
