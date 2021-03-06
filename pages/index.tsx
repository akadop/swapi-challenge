import * as Next from 'next'
import * as React from 'react'
import useSWR from 'swr'
import { Person } from '../components/person'
import { ActionTypes } from '../core/data/action-reducer'
import { SwapiContext } from '../core/data/swapi-provider'

const IndexPage: Next.NextPage = () => {
  const { data } = useSWR('SWAPI_ALL_PEOPLE_ENDPOINT')
  const { dispatch, state } = React.useContext(SwapiContext)

  React.useEffect(() => {
    if (data) {
      dispatch({
        type: ActionTypes.AddData,
        payload: { people: data.results }
      })
    }
  }, [data])

  return (
    <div>{state.people.length > 0 && state.people.map((person, index) => <Person key={index} person={person} />)}</div>
  )
}

export default IndexPage
