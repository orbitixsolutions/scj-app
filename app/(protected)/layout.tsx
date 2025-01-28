import { PanelLayout } from '@/components/panel-layout'
import { AuthWrapper } from '@/providers/auth-provider/auth.wrapper'
import { DataProviderWrapper } from '@/providers/data-provider/data-provider.wrapper'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthWrapper>
      <PanelLayout>
        <DataProviderWrapper>{children}</DataProviderWrapper>
      </PanelLayout>
    </AuthWrapper>
  )
}
