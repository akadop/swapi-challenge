import fetch from 'isomorphic-unfetch'
import { Film, People } from './swapi-types'

const endpoints = {
  SWAPI_ALL_PEOPLE_ENDPOINT: 'https://swapi.dev/api/people/',
  SWAPI_ALL_FILMS_ENDPOINT: 'https://swapi.dev/api/films/'
} as const

type AvailableEndpoints = keyof Omit<typeof endpoints, 'SWAPI_BASE_URL'>
type EndpointResponse<V = AvailableEndpoints> = V extends typeof endpoints['SWAPI_ALL_FILMS_ENDPOINT'] ? Film : People

export async function swapiFetcher<V = AvailableEndpoints>(url: keyof typeof endpoints): Promise<EndpointResponse<V>> {
  return await fetch(endpoints[url], {
    method: 'GET'
  }).then(res => res.json())
}
