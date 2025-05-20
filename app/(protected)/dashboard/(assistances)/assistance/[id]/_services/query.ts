import { queryOptions } from '@tanstack/react-query'
import { getAssistances } from './fetch'

type AssistanceQueryOptionsProps = {
  params: {
    id: string
  }
  searchParams: {
    date: string | null
    name: string | null
    lastName: string | null
  }
}

export const assistanceQueryOptions = (options: AssistanceQueryOptionsProps) =>
  queryOptions({
    queryKey: ['assistance', options.params.id],
    queryFn: async () =>
      await getAssistances({ mode: 'normal', data: options }),
  })
