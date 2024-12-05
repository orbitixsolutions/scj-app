export function getRoleName(role: string | undefined) {
  if (!role) return 'Indefinido'

  switch (role) {
    case 'DIRECTIVE':
      return 'Directivo'
    case 'ADMIN':
      return 'Administrador'
    case 'TEACHER':
      return 'Profesor'
    case 'STUDENT':
      return 'Estudiante'
    case 'DEVELOPER':
      return 'Desarrollador'
    default:
      return 'Indefinido'
  }

}
