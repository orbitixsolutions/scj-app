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

export function getStringDate(date: Date) {
  const [DAY, MONTH, YEAR] = new Date(date)
    .toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .split('/')

  return [YEAR, MONTH, DAY].join('-')
}