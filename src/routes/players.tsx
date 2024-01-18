import { FileRoute, Link, Outlet } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { playersQueryOptions } from '../playersQueryOptions'

export const Route = new FileRoute('/players').createRoute({
  validateSearch: (searchParams: Record<string, unknown>) => {
    return {
      search: searchParams.search
    }
  },
  loaderDeps: ({ search: { search } }) => ({ search }),
  loader: (opts) => opts.context.queryClient.ensureQueryData(playersQueryOptions(opts.deps.search as string)),
  component: PlayersComponent,
})

function PlayersComponent() {
  const playersQuery = useSuspenseQuery(playersQueryOptions(Route.useLoaderDeps().search as string))
  const players = playersQuery.data

  return (
    <div className="p-2 grid gap-4 mt-8 grid-cols-4">
      {players?.map(player => (
        <Link key={player.id} to='/player' search={{ playerId: player.id }}>
          <div className='p-4 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-md bg-white'>
            <h1 className='text-xl'>{player.first_name}</h1>
            <h2 className='text-3xl text-black font-bold'>{player.last_name}</h2>
            <hr className='my-2 border-gray-100' />
            <p>Weight: {player.weight_pounds ?? '--'}</p>
          </div>
        </Link>
      ))}
      <Outlet />
    </div>
  )
}
