import { FileRoute } from '@tanstack/react-router'
import { playerQueryOptions } from '../playerQueryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'

export const Route = new FileRoute('/player').createRoute({
  validateSearch: (searchParams: Record<string, unknown>) => {
    return {
      playerId: searchParams.playerId
    }
  },
  loaderDeps: ({ search: { playerId } }) => ({ playerId }),
  loader: (opts) => opts.context.queryClient.ensureQueryData(playerQueryOptions(opts.deps.playerId as string)),
  component: PlayerComponent,
})

function PlayerComponent() {
  const playersQuery = useSuspenseQuery(playerQueryOptions(Route.useLoaderDeps().playerId as string))
  const player = playersQuery.data

  return (
    <div className='p-4 shadow-sm mt-8 rounded-md bg-white'>
      <h1 className='text-xl'>{player.first_name}</h1>
      <h2 className='text-3xl text-black font-bold'>{player.last_name}</h2>
      <hr className='my-2 border-gray-100' />
      <p className='font-bold'>{player.team.full_name}</p>
      <p>{player.team.conference} / {player.team.division}</p>
    </div>
  )
}
