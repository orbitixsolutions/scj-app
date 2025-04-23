import { QueryToggle } from '@/components/query-toggle'
import { SearchBar } from '@/components/search-bar'

export function UserFilter() {
  return (
    <div className='flex items-center space-x-4'>
      <SearchBar
        queryParam='name'
        placeholder='Buscar usuarios...'
      />

      <QueryToggle
        queryKey='role'
        queryValue='directive'
      >
        Directivo
      </QueryToggle>

      <QueryToggle
        queryKey='role'
        queryValue='educator'
      >
        Educador
      </QueryToggle>
    </div>
  )
}
