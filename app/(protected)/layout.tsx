import { PanelLayout } from '@/components/panel-layout'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PanelLayout>{children}</PanelLayout>
}
