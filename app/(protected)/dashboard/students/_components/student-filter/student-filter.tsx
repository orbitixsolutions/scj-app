import { SearchBar } from '@/components/search-bar'

export function StudentFilter() {
  return (
    <div className='flex items-center space-x-4'>
      <SearchBar
        queryParam='name'
        placeholder='Buscar estudiantes...'
      />
    </div>
  )
}
