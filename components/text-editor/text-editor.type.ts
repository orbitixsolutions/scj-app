/* eslint-disable @typescript-eslint/no-explicit-any */

export type TextEditorProps = {
  initialValue?: any
  isLoading?: boolean
  disabled?: boolean
  placeholder?: string
  onChange: (value: any) => void
}
