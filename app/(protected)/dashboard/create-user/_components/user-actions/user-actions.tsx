import { DeleteButton } from '@/components/delete-button'
import { CreateUserForm as EditorUserForm } from '@/app/(protected)/dashboard/create-user/_components/create-user-form'
import { UserActionsProps } from '@/app/(protected)/dashboard/create-user/_components/user-actions/user-actions.type'
import { deleteUser } from '@/app/(protected)/dashboard/create-user/_services/delete'
import { Trash2 } from 'lucide-react'

export function UserActions(props: UserActionsProps) {
  const { id } = props

  return (
    <div className='flex items-center space-x-2'>
      <EditorUserForm id={id} />

      <DeleteButton
        itemId={id}
        onDelete={deleteUser}
      >
        <Trash2 />
      </DeleteButton>
    </div>
  )
}
