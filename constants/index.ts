export const DEV_MODE = process.env.NODE_ENV === 'development'

export const PAGE_NAME = 'Los pinos'

export const SELECT_ROLES = [
  {
    value: 'DIRECTIVE',
    label: 'Directivo',
  },
  {
    value: 'EDUCATOR',
    label: 'Educador',
  },
]

export const SELECT_EDUCATIONAL_LEVEL = [
  {
    label: '7º',
    value: 'SEVENTH',
  },
  {
    label: '8º',
    value: 'EIGHTH',
  },

  {
    label: '9º',
    value: 'NINTH',
  },
  {
    label: '4º de Bachillerato',
    value: 'FOURTH_SECONDARY',
  },
  {
    label: '5º de Bachillerato',
    value: 'FIFTH_SECONDARY',
  },

  {
    label: '6º de Bachilletaro',
    value: 'SIXTH_SECONDARY',
  },
]

export const SELECT_INSTITUTES = [
  {
    value: 'LOS_PINOS',
    label: 'Liceo Los Pinos',
  },
  {
    value: 'EXTERIOR_STUDENT',
    label: 'CJotero',
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
