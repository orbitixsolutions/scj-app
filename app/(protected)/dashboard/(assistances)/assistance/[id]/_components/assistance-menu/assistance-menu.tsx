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

export function AssistanceMenu(props: AssistanceMenuProps) {
  const { data: STUDENTS } = props

  return (
    <div className='w-full space-y-4'>
      <AssistanceDialogs data={STUDENTS} />
      <AssistanceFilter />
    </div>
  )
}

function AssistanceDialogs(props: AssistanceMenuProps) {
  const { data: STUDENTS } = props

  const FFALTS = filterStudentsByAbsences(STUDENTS, (length) => length <= 6)
  const SFALTS = filterStudentsByAbsences(STUDENTS, (length) => length >= 7)

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
                    data={FFALTS ?? []}
                    columns={absentColumns}
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
                    data={SFALTS ?? []}
                    columns={absentColumns}
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

function filterStudentsByAbsences(
  students: Array<StudentsProps>,
  condition: (value: number) => void
) {
  // Esto devuelve un array de objetos con los estudiantes con asistencias no atendidas.

  // Dependiendo de la condición que se le pase devolverá un array con los estudiantes que
  // tengan x cantidad de asistencias no atendidas
  return students
    .map((a) => ({
      students: {
        ...a.students,
        assistances: a.students?.assistances.filter(
          (a) => a.status === 'NOT_ATTENDED'
        ),
      },
    }))
    .filter((a) => condition(a.students.assistances?.length))
}
