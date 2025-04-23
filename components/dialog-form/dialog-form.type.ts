export type DialogFormProps = {
  title: string
  description?: string
  disabled?: boolean
  isEditing?: boolean
  children: React.ReactNode
  formId: string
  isOpen?: boolean
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
  buttonClassName?: string
}
