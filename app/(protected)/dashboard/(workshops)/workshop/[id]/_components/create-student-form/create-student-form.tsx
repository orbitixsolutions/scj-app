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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { z } from 'zod'
import { getCurrentDate } from '@/helpers/get-current-date'
import { parseDate } from '@internationalized/date'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { StudentSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { DialogDrop } from '@/components/dialog-drop/dialog-drop'
import { createStudent } from '@/app/(protected)/dashboard/students/_services/create'
import { useUploadImageToCloud } from '@/services/upload-core/use-upload-to-cloud'
import { InputDate } from '@/components/ui/input-date'
import { SELECT_EDUCATIONAL_LEVEL, SELECT_INSTITUTES } from '@/constants'
import { toast } from 'sonner'
import { useCurrentRole } from '@/hooks/use-session'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export function CreateStudentForm() {
  const ROLE = useCurrentRole()

  const [isPending, startTransition] = useTransition()
  const { handleUpload } = useUploadImageToCloud()

  const [isOpen, setIsOpen] = useState(false)
  const { refresh } = useRouter()

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

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
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
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button variant='secondary' className='w-full justify-start'>
          <Plus />
          Crear Alumno
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[720px] max-w-full'>
        <DialogHeader>
          <DialogTitle>Agregar alumno</DialogTitle>
        </DialogHeader>

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

        <DialogFooter className='grid grid-cols-2 gap-4'>
          <DialogClose asChild>
            <Button
              type='button'
              variant='outline'
            >
              Cancelar
            </Button>
          </DialogClose>

          <Button
            form='create-student-form'
            disabled={isPending}
            type='submit'
          >
            {isPending ? 'Guardar' : 'Crear'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
