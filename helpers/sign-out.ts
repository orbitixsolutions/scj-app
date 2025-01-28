import { signOut } from 'next-auth/react'
import { toast } from 'sonner'

export const handleSignout = async () => {
  await signOut()
  return toast.success('Sesión cerrada.')
}
