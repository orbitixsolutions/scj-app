import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { TablePaginationProps } from '@/components/table-pagination/table-pagination.type'
import { Input } from '@/components/ui/input'

export function TablePagination<TData>(props: TablePaginationProps<TData>) {
  const { table, title, pages = [5, 10] } = props

  return (
    <div className='flex items-center justify-between w-full space-x-4 py-2'>
      <div className='flex items-center gap-2'>
        <Select
          value={table.getState().pagination.pageSize.toString()}
          onValueChange={(value) => {
            table.setPageSize(Number(value))
          }}
        >
          <SelectTrigger className='w-[70px] h-8'>
            <SelectValue placeholder='10' />
          </SelectTrigger>
          <SelectContent>
            {pages.map((pageSize) => (
              <SelectItem
                key={pageSize}
                value={pageSize.toString()}
              >
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <h4 className='text-xs'>{title ? title : 'Elementos'} por página</h4>
      </div>

      <div className='flex items-center gap-1'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className='select-none'
        >
          Atras
        </Button>
        <Input
          type='number'
          min='1'
          max={table.getPageCount()}
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            table.setPageIndex(page)
          }}
          className='p-1 w-16 h-8'
        />
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className='select-none'
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}
