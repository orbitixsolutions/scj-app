import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Inicio',
}

export default function Home() {
  return redirect('/login')
}
