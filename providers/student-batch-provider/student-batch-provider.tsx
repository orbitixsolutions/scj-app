'use client'

import { deleteStudents } from '@/app/(protected)/dashboard/students/_services/delete'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { createContext, use, useState, useTransition } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export const useStudentBatch = () => {
  const CONTEXT = use(StudentBatchContext)
  if (!CONTEXT) throw new Error('StudentBatchContext not found.')
  return CONTEXT
}

type FormType = UseFormReturn<
  {
    items: string[]
  },
  never,
  undefined
>

type StudentBatchContextType = {
  isDeleting: boolean
  isPending: boolean
  numberOfItems: number
  allItems: string[]
  form: FormType
  onDeleting: (isDeleting: boolean) => void
} | null

export const StudentBatchContext = createContext<StudentBatchContextType>(null)

const ItemsSchemas = z.object({
  items: z
    .array(z.string())
    .min(1, { message: 'Debes seleccionar al menos un estudiante' }),
})

export function StudentBatchProvider(props: React.PropsWithChildren) {
  const { children } = props
  const [isDeleting, onDeleting] = useState(false)

  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const form = useForm<z.infer<typeof ItemsSchemas>>({
    resolver: zodResolver(ItemsSchemas),
    defaultValues: {
      items: [],
    },
  })

  const numberOfItems = form.watch('items').length
  const allItems = form.watch('items')

  const onSubmit = form.handleSubmit((values) => {
    const ITEMS = values.items

    startTransition(async () => {
      const { status, message } = await deleteStudents(ITEMS)

      if (status === 201) {
        onDeleting(false)
        toast.success(message)
        form.reset()
        refresh()

        return
      }

      toast.error(message)
    })
  })

  return (
    <StudentBatchContext.Provider
      value={{
        isDeleting,
        form,
        isPending,
        numberOfItems,
        allItems,
        onDeleting,
      }}
    >
      <Form {...form}>
        <form
          id='delete-students'
          onSubmit={onSubmit}
        >
          {children}
        </form>
      </Form>
    </StudentBatchContext.Provider>
  )
}
