'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { LoginSchema } from '@/schemas'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { login } from '@/app/login/_services/login'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { z } from 'zod'

export function LoginForm() {
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    startTransition(async () => {
      const { message, status } = await login(values)

      if (status === 201) {
        toast.success(message)
        return
      }

      toast.error(message)
    })
  })

  return (
    <div className='size-full grid place-items-center'>
      <div className='w-[480px] max-w-full mx-auto space-y-6'>
        <article className='text-center space-y-4'>
          <h2 className='text-5xl font-bold'>Bienvenido/a</h2>
          <Separator className='bg-primary h-2' />
          <p className='text-sm font-light opacity-60'>
            Ingresa tus credenciales de acceso asignados anteriormente para
            poder ingresar a la plataforma.
          </p>
        </article>

        <Form {...form}>
          <form
            className='grid gap-4'
            onSubmit={onSubmit}
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='Correo Electrónico'
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='**********'
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              disabled={isPending}
            >
              {isPending ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
