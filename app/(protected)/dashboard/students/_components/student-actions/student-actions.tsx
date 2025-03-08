import { DeleteButton } from '@/components/delete-button'
import { CreateStudentForm as EditorStudentForm } from '@/app/(protected)/dashboard/students/_components/create-student-form'
import { StudentActionsProps } from '@/app/(protected)/dashboard/students/_components/student-actions/student-actions.type'
import { deleteStudent } from '@/app/(protected)/dashboard/students/_services/delete'
import { Trash2 } from 'lucide-react'
import { useStudentBatch } from '@/providers/student-batch-provider'
import { useCurrentRole } from '@/hooks/use-session'

export function StudentActions(props: StudentActionsProps) {
  const { id } = props

  const { isDeleting } = useStudentBatch()
  const ROLE = useCurrentRole()

  if (ROLE === 'STUDENT' || ROLE === 'EDUCATOR') return null
  if (isDeleting) return null

  return (
    <div
      onDoubleClick={(e) => e.stopPropagation()}
      className='absolute top-2 right-2 p-2 rounded-md bg-secondary group-hover/item:opacity-100 opacity-0 duration-300 ease-in-out transtion-all flex items-center gap-2'
    >
      <EditorStudentForm id={id} />

      <DeleteButton
        itemId={id}
        onDelete={deleteStudent}
        imageSettings={{
          folder: 'students',
          path: 'student',
          removeImage: true,
        }}
      >
        <Trash2 />
      </DeleteButton>
    </div>
  )
}
