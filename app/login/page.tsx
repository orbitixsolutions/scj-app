import { LoginForm } from '@/app/login/_components/login-form'
import { LoginHeader } from '@/app/login/_components/login-header'

export default function LoginPage() {
  return (
    <section className='flex flex-col h-dvh'>
      <LoginHeader />
      <LoginForm />
    </section>
  )
}
