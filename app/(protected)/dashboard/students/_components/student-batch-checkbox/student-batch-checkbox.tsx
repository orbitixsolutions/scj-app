'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { useStudentBatch } from '@/providers/student-batch-provider'
import { StudentBatchCheckboxProps } from '@/app/(protected)/dashboard/students/_components/student-batch-checkbox/student-batch-checkbox.type'

export function StudentBatchCheckbox(props: StudentBatchCheckboxProps) {
  const { id } = props

  const { form, isDeleting } = useStudentBatch()
  if (!isDeleting) return null

  return (
    <FormField
      control={form.control as never}
      name='items'
      render={({ field }) => (
        <FormItem className='absolute top-4 left-4'>
          <FormControl>
            <Checkbox
              checked={field.value?.includes(id)}
              onCheckedChange={(checked) => {
                return checked
                  ? field.onChange([...field.value, id])
                  : field.onChange(
                      field.value.filter((item: never) => item !== id)
                    )
              }}
            />
          </FormControl> 
        </FormItem>
      )}
    />
  )
}
