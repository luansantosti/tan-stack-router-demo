import { fetchPlayer } from './players'
import { queryOptions } from '@tanstack/react-query'

export const playerQueryOptions = (playerId: string) =>
  queryOptions({
    queryKey: ['players', { playerId }],
    queryFn: () => fetchPlayer(playerId),
  })
