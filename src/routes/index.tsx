import { FileRoute, useNavigate } from '@tanstack/react-router'
import type { ChangeEvent, FormEvent } from 'react'

const HomeComponent = () => {
  const navigate = useNavigate({ from: Route.fullPath })
  const { search } = Route.useSearch()

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    navigate({
      search: () => ({
        search: event.target.value
      }),
      replace: true,
    })
  }
  
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate({
      to: '/players',
      search: {
        search
      }
    })
  }

  return (
    <div>
      <form onSubmit={onSubmit} className='flex m-auto max-w-[700px] gap-2 items-end p-5'>
        <div className='flex shrink-0 flex-1 flex-col'>
          <label htmlFor="player">Player</label>
          <input onChange={onChange} value={search} id="player" type="text" className='p-2 rounded-sm' />
        </div>
        <button type='submit' className='py-2 bg-sky-600 px-4 text-white rounded-sm'>Search</button>
      </form>
    </div>
  )
}

type HomeSearch = {
  search?: string;
}

export const Route = new FileRoute('/').createRoute({
  component: HomeComponent,
  validateSearch: (searchParams: Record<string, unknown>): HomeSearch => {
    return {
      search: (searchParams.search as string) || "",
    }
  } 
})