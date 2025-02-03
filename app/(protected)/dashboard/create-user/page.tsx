import { ContentLayout } from '@/components/content-layout'
import { CreateUserForm } from '@/app/(protected)/dashboard/create-user/_components/create-user-form'
import { fetchUser } from '@/app/(protected)/dashboard/create-user/_services/fetch'
import { UserDataTable } from '@/app/(protected)/dashboard/create-user/_components/user-table'
import { UserColumns } from '@/app/(protected)/dashboard/create-user/_components/user-table/user-table.column'
import { UserFilter } from '@/app/(protected)/dashboard/create-user/_components/user-filter'
import { PageProps } from '@/app/(protected)/dashboard/create-user/_types'
import { User } from '@prisma/client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crear usuarios',
}

export default async function CreateUserPage(props: PageProps) {
  const { searchParams: PARAMS } = props
  const USERS = (await fetchUser(PARAMS)) as User[]

  return (
    <ContentLayout title='Crear usuario'>
      <header className='flex items-center justify-between'>
        <h2 className='font-bold text-xl'>Crear usuario</h2>
        <CreateUserForm />
      </header>
      <section className='space-y-4'>
        <UserFilter />

        <UserDataTable
          data={USERS ?? []}
          columns={UserColumns}
        />
      </section>
    </ContentLayout>
  )
}
