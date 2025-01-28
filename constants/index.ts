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

export const SELECT_INSTITUTES = [
  {
    value: 'LOS_PINOS',
    label: 'Los Pinos',
  },
  {
    value: 'EXTERIOR_STUDENT',
    label: 'Estudiante externo',
  },
]

export const SELECT_ASSISTANCE_STATUS = [
  {
    value: 'ATTENDED',
    label: 'Asistio',
  },
  {
    value: 'ATTENDED_EXCUSED',
    label: 'No asistio (excusado)',
  },
  {
    value: 'NOT_ATTENDED',
    label: 'No asistio',
  },
  {
    value: 'NOT_DETERMINED',
    label: 'No determinado',
  },
]

export const ASSISTANCE_COLORS = {
  ATTENDED: 'bg-[#CFF7D3] dark:bg-accent dark:text-[#CFF7D3]',
  ATTENDED_EXCUSED: 'bg-[#FDFFCD] dark:bg-accent dark:text-[#FDFFCD]',
  NOT_ATTENDED: 'bg-[#FDD3D0] dark:bg-accent dark:text-[#FDD3D0]',
  NOT_DETERMINED: 'bg-[#FBFBFB] dark:bg-accent dark:text-[#FBFBFB]',
}

export const NUMBER_ASSISTANCE_COLORS = {
  3: 'text-yellow-500',
  5: 'text-orange-500',
  7: 'text-red-500',
}

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
