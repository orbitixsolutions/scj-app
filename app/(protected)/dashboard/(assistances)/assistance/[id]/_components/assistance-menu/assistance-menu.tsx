import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AssistanceMenuProps } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/assistance-menu/assistance-menu.type'
import { AbsentDataTable } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/absent-table'
import { StudentsProps } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_types'
import { absentColumns } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/absent-table/absent.column'
import { AssistanceFilter } from '@/app/(protected)/dashboard/(assistances)/assistance/[id]/_components/assitance-filter'

function filterStudentsByAbsences(
  items: StudentsProps[],
  condition: (value: number) => void
) {
  const ITEMS =  items
  .map((item) => ({
    ...item,
    assistances: item.assistances.filter(
      (assistance) => assistance.status === 'NOT_ATTENDED'
    ),
  }))
  .filter((a) => condition(a.assistances.length))

  return ITEMS
}

export function AssistanceMenu(props: AssistanceMenuProps) {
  const { data: STUDENTS } = props

  return (
    <div className='w-full space-y-4'>
      <AssistanceDialog data={STUDENTS} />
      <AssistanceFilter />
    </div>
  )
}

function AssistanceDialog(props: AssistanceMenuProps) {
  const { data: STUDENTS } = props

  const FIVE_FALTS = filterStudentsByAbsences(
    STUDENTS,
    (length) => length <= 4
  ) as []

  const FIVE_OR_MORE_FALTS = filterStudentsByAbsences(
    STUDENTS,
    (length) => length >= 5
  ) as []

  return (
    <div className='w-full space-y-4'>
      <Dialog>
        <DialogTrigger asChild>
          <Button size='full'>Ver ausentes</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Que listas quieres ver?</DialogTitle>
          </DialogHeader>

          <div className='space-y-2'>
            <Dialog>
              <DialogTrigger asChild>
                <Button size='full'>Ver ausentes recurrentes</Button>
              </DialogTrigger>
              <DialogContent className='max-w-[720px] w-full'>
                <DialogHeader>
                  <DialogTitle>Ausentes recurrentes</DialogTitle>
                </DialogHeader>
                <div>
                  <AbsentDataTable
                    columns={absentColumns}
                    data={FIVE_FALTS ?? []}
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button>Volver</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button size='full'>Ver ausentes críticos temporales</Button>
              </DialogTrigger>
              <DialogContent className='max-w-[720px] w-full'>
                <DialogHeader>
                  <DialogTitle>Ausentes críticos temporales</DialogTitle>
                </DialogHeader>
                <div>
                  <AbsentDataTable
                    columns={absentColumns}
                    data={FIVE_OR_MORE_FALTS ?? []}
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button>Volver</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

