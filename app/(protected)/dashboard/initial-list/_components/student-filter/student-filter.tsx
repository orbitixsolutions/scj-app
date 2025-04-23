import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { SearchBar } from '@/components/search-bar'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { SELECT_EDUCATIONAL_LEVEL } from '@/constants'
import { SearchSelect } from '@/components/search-select'

export function StudentFilter() {
  return (
    <div className='w-full flex flex-wrap items-center gap-2'>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline'>
            <Search />
            Buscar alumno
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className='space-y-2'>
            <SearchBar
              queryParam='firstName'
              placeholder='Nombre...'
            />
            <SearchBar
              queryParam='lastName'
              placeholder='Apellido...'
            />
          </div>
        </PopoverContent>
      </Popover>

      <SearchSelect
        queryParam='educational_level'
        placeholder='Filtrar por nivel educativo'
        items={SELECT_EDUCATIONAL_LEVEL}
      />
    </div>
  )
}
