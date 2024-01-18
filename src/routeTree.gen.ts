import { Route as rootRoute } from './routes/__root'
import { Route as PlayersImport } from './routes/players'
import { Route as PlayerImport } from './routes/player'
import { Route as IndexImport } from './routes/index'

const PlayersRoute = PlayersImport.update({
  path: '/players',
  getParentRoute: () => rootRoute,
} as any)

const PlayerRoute = PlayerImport.update({
  path: '/player',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)
declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/player': {
      preLoaderRoute: typeof PlayerImport
      parentRoute: typeof rootRoute
    }
    '/players': {
      preLoaderRoute: typeof PlayersImport
      parentRoute: typeof rootRoute
    }
  }
}
export const routeTree = rootRoute.addChildren([
  IndexRoute,
  PlayerRoute,
  PlayersRoute,
])
