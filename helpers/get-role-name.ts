import { SELECT_ROLES } from '@/constants'

export function getRoleName(role: string | undefined) {
  if (!role) return 'Indefinido'

  const ROLE = SELECT_ROLES.find((r) => r.value === role)
  return ROLE?.label || 'Indefinido'
}
