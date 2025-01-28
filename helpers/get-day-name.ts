export function getDayName(day: string) {
  switch (day) {
    case 'MONDAY':
      return 'Lu'
    case 'TUESDAY':
      return 'Ma'
    case 'WEDNESDAY':
      return 'Mi'
    case 'THURSDAY':
      return 'Ju'
    case 'FRIDAY':
      return 'Vi'
    case 'SATURDAY':
      return 'Sa'
    case 'SUNDAY':
      return 'Do'
    case 'NONE':
      return ''
  }
}
