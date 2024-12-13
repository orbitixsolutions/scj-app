'use client'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { DialogForm } from '@/components/dialog-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SELECT_ROLES } from '@/constants'
import { UserSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCheck, ChevronsUpDown } from 'lucide-react'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { TextEditor } from '@/components/text-editor'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { createUser } from '@/app/(protected)/dashboard/create-user/_services/create'
import { CreateUserFormProps } from '@/app/(protected)/dashboard/create-user/_components/create-user-form/create-user-form.type'
import { updateUser } from '@/app/(protected)/dashboard/create-user/_services/update'
import { cn } from '@/lib/utils'
import { z } from 'zod'
import { RolesEnum } from '@prisma/client'

export function CreateUserForm(props: CreateUserFormProps) {
  const { id } = props

  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const { refresh } = useRouter()

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      lastName: '',
      name: '',
      email: '',
      password: '',
      documentIdentity: '',
      role: undefined,
      description: '',
    },
  })

  const IS_EDITING = id !== undefined

  useEffect(() => {
    if (IS_EDITING) {
      startTransition(async () => {
        const RES = await fetch(`/api/v0/dashboard/users/id/${id}`)
        const DATA = await RES.json()

        if (DATA.ok) return

        form.setValue('name', DATA.name)
        form.setValue('lastName', DATA.lastName)
        form.setValue('email', DATA.email)
        form.setValue('documentIdentity', DATA.documentIdentity)
        form.setValue('role', DATA.role)
        form.setValue('description', DATA.description)
      })
    }
  }, [IS_EDITING, form, id])

  const onSubmit = form.handleSubmit(async (values) => {
    startTransition(async () => {
      if (IS_EDITING) {
        const { status, message } = await updateUser(values, id)

        if (status === 201) {
          toast.success(message)
          refresh()
          setIsOpen(false)

          return
        }

        toast.error(message)
        return
      }

      const { status, message } = await createUser(values)

      if (status === 201) {
        toast.success(message)
        form.reset()
        refresh()
        setIsOpen(false)

        return
      }

      toast.error(message)
    })
  })

  return (
    <DialogForm
      isEditing={IS_EDITING}
      title={IS_EDITING ? 'Editar usuario' : 'Crear usuario'}
      formId='create-user-form'
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <Form {...form}>
        <form
          id='create-user-form'
          onSubmit={onSubmit}
          className='grid grid-cols-2 gap-4'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Miguel'
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Roque'
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Electrónico</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='correo@lospinos.com'
                    disabled={isPending}
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
                <FormLabel>
                  {IS_EDITING ? 'Nueva Contraseña (Opcional)' : 'Contraseña'}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='********'
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='documentIdentity'
            render={({ field }) => (
              <FormItem>
                <FormLabel>CI</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='10101010'
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem className='flex flex-col justify-end'>
                <FormLabel>Rol</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        role='combobox'
                        className={cn(
                          'justify-between',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value
                          ? SELECT_ROLES.find(
                              (language) => language.value === field.value
                            )?.label
                          : 'Seleccionar rol'}
                        <ChevronsUpDown className='opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-[200px] p-0'>
                    <Command>
                      <CommandInput
                        placeholder='Buscar rol...'
                        className='h-9'
                      />
                      <CommandList>
                        <CommandEmpty>No se encontraron roles.</CommandEmpty>
                        <CommandGroup>
                          {SELECT_ROLES.map((rol) => (
                            <CommandItem
                              value={rol.label}
                              key={rol.value}
                              onSelect={() => {
                                form.setValue('role', rol.value as RolesEnum)
                              }}
                            >
                              {rol.label}
                              <CheckCheck
                                className={cn(
                                  'ml-auto',
                                  rol.value === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <TextEditor
                    initialValue={field.value}
                    onChange={field.onChange}
                    isLoading={isPending}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </DialogForm>
  )
}
