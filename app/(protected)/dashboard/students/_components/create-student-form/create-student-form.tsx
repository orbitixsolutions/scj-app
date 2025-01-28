'use client'

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { DialogForm } from '@/components/dialog-form'
import { parseDate } from '@internationalized/date'
import { CreateStudentFormProps } from '@/app/(protected)/dashboard/students/_components/create-student-form/create-student-form.type'
import { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { StudentSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { DialogDrop } from '@/components/dialog-drop/dialog-drop'
import { createStudent } from '@/app/(protected)/dashboard/students/_services/create'
import { updateStudent } from '@/app/(protected)/dashboard/students/_services/update'
import { useUploadImageToCloud } from '@/services/upload-core/use-upload-to-cloud'
import { InputDate } from '@/components/ui/input-date'
import { getCurrentDate, getStringDate } from '@/helpers/get-current-date'
import { toast } from 'sonner'
import { SELECT_INSTITUTES } from '@/constants'
export function CreateStudentForm(props: CreateStudentFormProps) {
  const { id } = props

  const [isPending, startTransition] = useTransition()
  const { handleUpload } = useUploadImageToCloud()

  const [isOpen, setIsOpen] = useState(false)
  const { refresh } = useRouter()

  const IS_EDITING = id !== undefined

  const form = useForm<z.infer<typeof StudentSchema>>({
    resolver: zodResolver(StudentSchema),
    defaultValues: {
      name: '',
      lastName: '',
      studyYear: '',
      institute: '',
      documentIdentity: '',
      dateOfBirth: getCurrentDate(),
    },
  })

  useEffect(() => {
    if (IS_EDITING) {
      startTransition(async () => {
        const RES = await fetch(`/api/v0/dashboard/students/id/${id}`)
        const DATA = await RES.json()

        if (DATA.ok) return

        form.setValue('name', DATA.name)
        form.setValue('lastName', DATA.lastName)
        form.setValue('studyYear', DATA.studyYear)
        form.setValue('institute', DATA.institute)
        form.setValue('documentIdentity', DATA.documentIdentity)
        form.setValue('dateOfBirth', getStringDate(DATA.dateOfBirth))
      })
    }
  }, [IS_EDITING, form, id])

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      if (IS_EDITING) {
        const { status, message } = await updateStudent(values, id)

        if (status === 201) {
          handleUpload({ folder: 'students', path: 'student', id: id })
          toast.success(message)
          setIsOpen(false)
          refresh()

          return
        }

        toast.error(message)
        return
      }

      const STUDENT_ID = crypto.randomUUID()
      const { status, message } = await createStudent(values, STUDENT_ID)

      if (status === 201) {
        handleUpload({ folder: 'students', path: 'student', id: STUDENT_ID })
        toast.success(message)
        form.reset()
        setIsOpen(false)
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
      title='Crear alumno'
      isEditing={IS_EDITING}
      formId='create-student-form'
    >
      <Form {...form}>
        <form
          id='create-student-form'
          onSubmit={onSubmit}
          className='grid grid-cols-1 md:grid-cols-2 gap-4'
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
                    placeholder='Jimenez'
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='studyYear'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Año de estudio</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Primaria'
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='institute'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institución</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Seleccionar institución' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SELECT_INSTITUTES.map((institute) => (
                        <SelectItem
                          key={institute.value}
                          value={institute.value}
                        >
                          {institute.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
            name='dateOfBirth'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de nacimiento</FormLabel>
                <FormControl>
                  <InputDate
                    aria-label='Fecha de nacimiento'
                    value={parseDate(field.value)}
                    onChange={(value) => field.onChange(value?.toString())}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='col-span-2'>
            <DialogDrop />
          </div>
        </form>
      </Form>
    </DialogForm>
  )
}
