import { fetchPlayers } from './players'
import { queryOptions } from '@tanstack/react-query'

export const playersQueryOptions = (search?: string) => queryOptions({
  queryKey: ['players', [search]],
  queryFn: () => fetchPlayers(search),
})
