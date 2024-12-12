import { DeleteButton } from '@/components/delete-button'
import { Trash2 } from 'lucide-react'
import { WorkshopActionsProps } from '@/app/(protected)/dashboard/(workshops)/workshops/_components/workshop-actions/workshop-actions.type'
import { CreateWorkshopForm as EditorWorkshopForm } from '@/app/(protected)/dashboard/(workshops)/workshops/_components/create-workshop-form'
import { deleteWorkshop } from '@/app/(protected)/dashboard/(workshops)/workshops/_services/delete'

export function WorkshopActions(props: WorkshopActionsProps) {
  const { id } = props

  return (
    <div className='absolute bottom-5 right-4 flex items-center space-x-2'>
      <DeleteButton
        onDelete={deleteWorkshop}
        itemId={id}
        imageSettings={{
          path: 'workshop',
          folder: 'workshops',
          removeImage: true,
        }}
      >
        <Trash2 />
      </DeleteButton>

      <EditorWorkshopForm id={id} />
    </div>
  )
}
