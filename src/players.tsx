import axios from 'axios'

export type PlayerType = {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  weight_pounds: string;
  team: {
    full_name: string;
    conference: string;
    division: string;
  }
}

export class PlayerNotFoundError extends Error {}

export const fetchPlayer = async (playerId: string) => {
  console.log(`Fetching player with id ${playerId}...`)

  const post = await axios
    .get<PlayerType>(`https://www.balldontlie.io/api/v1/players/${playerId}`)
    .then((r) => r.data)
    .catch((err) => {
      if (err.response.status === 404) {
        throw new PlayerNotFoundError(`Post with id "${playerId}" not found!`)
      }
      throw err
    })

  return post
}

export const fetchPlayers = async (search?: string ) => {
  console.log('Fetching players...')
  if (!search) {
    return null
  }

  return axios
    .get<{ data: PlayerType[] }>(`https://www.balldontlie.io/api/v1/players?search=${search}`)
    .then((r) => r.data.data )
}
