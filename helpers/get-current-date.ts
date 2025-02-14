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
  const [DAY, MONTH, YEAR] = new Date(date)
    .toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .split('/')

  return [YEAR, MONTH, DAY].join('-')
}

export function formatISODateToString(date: Date | string) {
  const [YEAR, MONTH, DAY] = new Date(date).toISOString().split('T')[0].split('-')
  return [YEAR, MONTH, DAY].join('-')
}
