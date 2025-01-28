import { fetcher } from '@/helpers/fetcher'
import { useSuspenseQuery } from '@tanstack/react-query'

export function useFetch<T>(path: string) {
  const { data, status, error, refetch } = useSuspenseQuery<T>({
    queryKey: ['api', path],
    queryFn: async () => await fetcher(path),
  })

  return { data, status, error, refetch }
}
