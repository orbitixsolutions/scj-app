'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { Suspense, useEffect, useState, useTransition } from 'react'
import { CreateWorkshopFormProps } from '@/app/(protected)/dashboard/(workshops)/workshops/_components/create-workshop-form/create-workshop-form.type'
import { useUploadImageToCloud } from '@/services/upload-core/use-upload-to-cloud'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { WorkshopSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogForm } from '@/components/dialog-form'
import { TeacherSelector } from '@/components/teacher-selector/teacher-selector'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { DaySelector } from '@/components/day-selector'
import { TextEditor } from '@/components/text-editor'
import { createWorkshop } from '@/app/(protected)/dashboard/(workshops)/workshops/_services/create'
import { DialogDrop } from '@/components/dialog-drop/dialog-drop'
import { updateWorkshop } from '@/app/(protected)/dashboard/(workshops)/workshops/_services/update'
import { toast } from 'sonner'
import { useData } from '@/providers/data-provider'

export function CreateWorkshopForm(props: CreateWorkshopFormProps) {
  const { id } = props
  const { data } = useData()

  const [isPending, startTransition] = useTransition()
  const { handleUpload } = useUploadImageToCloud()

  const [isOpen, setIsOpen] = useState(false)
  const { refresh } = useRouter()

  const IS_EDITING = id !== undefined

  const form = useForm<z.infer<typeof WorkshopSchema>>({
    resolver: zodResolver(WorkshopSchema),
    defaultValues: {
      name: '',
      days: [],
      description: '',
      teacherId: '',
    },
  })

  useEffect(() => {
    if (IS_EDITING) {
      const WORKSHOP = data.workshops?.find((workshop) => workshop.id === id)
      if (!WORKSHOP) return

      form.setValue('name', WORKSHOP?.name)
      form.setValue('description', WORKSHOP?.description)
      form.setValue('teacherId', WORKSHOP?.teacherId)
      form.setValue('days', WORKSHOP?.workshopsByDay.map(i => i.day))
    }
  }, [IS_EDITING, data, form, id])

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      if (IS_EDITING) {
        const { status, message } = await updateWorkshop(values, id)

        if (status === 201) {
          handleUpload({ folder: 'workshops', path: 'workshop', id: id })
          toast.success(message)
          setIsOpen(false)
          refresh()

          return
        }

        toast.error(message)
        return
      }

      const WORKSHOP_ID = crypto.randomUUID()
      const { status, message } = await createWorkshop(values, WORKSHOP_ID)

      if (status === 201) {
        toast.success(message)
        handleUpload({ folder: 'workshops', path: 'workshop', id: WORKSHOP_ID })
        setIsOpen(false)
        form.reset()
        refresh()

        return
      }

      toast.error(message)
    })
  })

  return (
    <DialogForm
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={IS_EDITING ? 'Editar taller' : 'Crear taller'}
      isEditing={IS_EDITING}
      formId='create-workshop-form'
      disabled={isPending}
    >
      <Form {...form}>
        <form
          id='create-workshop-form'
          onSubmit={onSubmit}
          className='grid grid-cols-1 md:grid-cols-2 gap-4'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder='Nombre del taller'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='teacherId'
            render={({ field }) => (
              <FormItem className='flex flex-col justify-end'>
                <FormLabel>Asigar profesor</FormLabel>
                <FormControl>
                  <Suspense
                    fallback={<Skeleton className='h-9 px-4 w-full py-2' />}
                  >
                    <TeacherSelector
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isPending}
                    />
                  </Suspense>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='days'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jornada</FormLabel>
                <FormControl>
                  <DaySelector
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isPending}
                  />
                </FormControl>
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem className='col-span-2'>
            <DialogDrop />
          </FormItem>
        </form>
      </Form>
    </DialogForm>
  )
}
