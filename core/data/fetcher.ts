import fetch from 'isomorphic-unfetch'
import useSWR from 'swr'
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

export function usePeople() {
  const { data } = useSWR('SWAPI_ALL_PEOPLE_ENDPOINT')
  console.log(data)

  return { people: [] }

  // const results = data.results && data.results.length > 0 ? data.results : []
  // return {
  //   people: results as People[]
  // }
}

export function useFilms() {
  const { data } = useSWR('SWAPI_ALL_FILMS_ENDPOINT')
  console.log(data)
  return { films: [] }
  // const results = data.results && data.results.length > 0 ? data.results : []
  // return {
  //   films: results as Film[]
  // }
}
