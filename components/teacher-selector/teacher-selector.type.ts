/* eslint-disable @typescript-eslint/no-explicit-any */

export type TeacherSelectorProps = {
  value: string | undefined
  onChange: (...value: any[]) => void
  disabled?: boolean
  className?: string
}
