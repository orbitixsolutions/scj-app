import { SearchBar } from '@/components/search-bar'
import { TeacherQuerySelector } from '@/components/teacher-query-selector'

export function WorkshopFilter() {
  return (
    <div className='flex items-center space-x-4'>
      <SearchBar
        placeholder='Buscar talleres'
        queryParam='workshop_name'
      />

      <TeacherQuerySelector
        className='max-w-full w-[320px]'
        queryParam='teacher_id'
      />
    </div>
  )
}
