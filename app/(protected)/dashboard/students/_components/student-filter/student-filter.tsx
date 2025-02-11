import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { SearchBar } from '@/components/search-bar'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

export function StudentFilter() {
  return (
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
  )
}
