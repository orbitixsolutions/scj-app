import { PanelLayout } from '@/components/panel-layout'
import { DataProviderWrapper } from '@/providers/data-provider/data-provider.wrapper'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PanelLayout>
      <DataProviderWrapper>{children}</DataProviderWrapper>
    </PanelLayout>
  )
}
