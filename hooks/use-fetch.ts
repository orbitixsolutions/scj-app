import { fetcher } from '@/helpers/fetcher'
import { useSuspenseQuery, useQuery } from '@tanstack/react-query'

export function useSuspenseFetch<T>(path: string) {
  const { data, status, error, refetch } = useSuspenseQuery<T>({
    queryKey: ['api', path],
    queryFn: async () => await fetcher(path),
  })

  return { data, status, error, refetch }
}

export function useFetch<T>(path: string) {
  const { data, status, error, refetch } = useQuery<T>({
    queryKey: ['api', path],
    queryFn: async () => await fetcher(path),
  })

  return { data, status, error, refetch }
}
