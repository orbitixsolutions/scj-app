export const DEV_MODE = process.env.NODE_ENV === 'development'

export const PAGE_NAME = 'Los pinos'

export const SELECT_ROLES = [
  {
    value: 'DIRECTIVE',
    label: 'Directivo',
  },
  {
    value: 'ADMIN',
    label: 'Administrador',
  },
  {
    value: 'TEACHER',
    label: 'Profesor',
  },
  {
    value: 'STUDENT',
    label: 'Estudiante',
  },
  {
    value: 'DEVELOPER',
    label: 'Desarrollador',
  },
]

export const SELECT_DAYS = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
  'NONE',
]
