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
  const DATE = new Date(date)

  if (!(DATE instanceof Date)) {
    throw new Error('La entrada debe ser un objeto Date válido.')
  }

  const year = DATE.getFullYear()
  const month = String(DATE.getMonth() + 1).padStart(2, '0')
  const day = String(DATE.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
