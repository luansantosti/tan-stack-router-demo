import {  Link, Outlet, rootRouteWithContext } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'

export const Route = rootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: () => <div className='p-8'>
  <Link to="/"><h1 className='text-center text-5xl font-bold'>NBA Players</h1></Link>
  <Outlet />
  </div>
})