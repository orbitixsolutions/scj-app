import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { DateQuery } from '@/components/date-query'
import { SearchBar } from '@/components/search-bar'
import { Button } from '@/components/ui/button'
import { Suspense } from 'react'
import { Loader } from 'lucide-react'

export function AssistanceFilter() {
  return (
    <div className='grid grid-cols-3 gap-4'>
      <Suspense fallback={<Loader className='animate-spin' />}>
        <DateQuery />
      </Suspense>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline'>Buscar por estudiante</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className='flex flex-col gap-2'>
            <SearchBar
              queryParam='name'
              placeholder='Nombre'
            />
            <SearchBar
              queryParam='lastName'
              placeholder='Apellido'
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
