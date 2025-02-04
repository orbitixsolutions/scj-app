import { format } from 'date-fns'

export function getCurrentDate() {
  const [DAY, MONTH, YEAR] = new Date()
    .toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .split('/')

  return [YEAR, MONTH, DAY].join('-')
}

export function formatDateToString(date: Date | string) {
  const [MONTH, DAY, YEAR] = format(date, 'P').split('/')
  return `${YEAR}-${MONTH}-${DAY}`
}
