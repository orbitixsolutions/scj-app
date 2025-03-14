import type { Metadata } from 'next'
import { Onest } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { Providers } from '@/providers'
import { AuthWrapper } from '@/providers/auth-provider/auth.wrapper'
import { DataProviderWrapper } from '@/providers/data-provider/data-provider.wrapper'
import './globals.css'

const onest = Onest({
  variable: '--font-onest',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'SCJ - Los Pinos',
  description: 'Administración de los Pinos',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es'>
      <body className={`${onest.variable} ${onest.className} antialiased`}>
        <Toaster position='top-center' />
        <Providers>
          <DataProviderWrapper>
            <AuthWrapper>{children}</AuthWrapper>
          </DataProviderWrapper>
        </Providers>
      </body>
    </html>
  )
}
