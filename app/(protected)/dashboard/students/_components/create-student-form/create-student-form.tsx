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
import {
  getCurrentDate,
  formatISODateToString,
} from '@/helpers/get-current-date'
import { SELECT_EDUCATIONAL_LEVEL, SELECT_INSTITUTES } from '@/constants'
import { useData } from '@/providers/data-provider'
import { toast } from 'sonner'
import { useCurrentRole } from '@/hooks/use-session'

export function CreateStudentForm(props: CreateStudentFormProps) {
  const { id } = props

  const { data } = useData()
  const STUDENT = data.students.find((item) => item.id === id)
  const ROLE = useCurrentRole()

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
      institute: '',
      educationalLevel: '',
      instituteName: '',
      dateOfBirth: getCurrentDate(),
    },
  })

  useEffect(() => {
    if (IS_EDITING) {
      if (!STUDENT) return
      const DOB = new Date(STUDENT.dateOfBirth)

      form.setValue('name', STUDENT.name)
      form.setValue('lastName', STUDENT.lastName)
      form.setValue('institute', STUDENT.institute)
      form.setValue('educationalLevel', STUDENT.educationalLevel)
      form.setValue('instituteName', STUDENT.instituteName)
      form.setValue('dateOfBirth', formatISODateToString(DOB))
    }
  }, [STUDENT, IS_EDITING, form, id])

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

  if (ROLE === 'STUDENT' || ROLE === 'EDUCATOR') return null

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
            name='instituteName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de la institución</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Instituto 1'
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
                <FormLabel>Liceos</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Seleccionar Liceos' />
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
            name='educationalLevel'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nivel educativo</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Seleccionar nivel educativo' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SELECT_EDUCATIONAL_LEVEL.map((level) => (
                        <SelectItem
                          key={level.value}
                          value={level.value}
                        >
                          {level.label}
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
