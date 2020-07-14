import React from 'react'
import { People } from '../core/data/swapi-types'
import Link from 'next/link'
import { SwapiContext } from '../core/data/swapi-provider'
import { ActionTypes } from '../core/data/action-reducer'

interface PersonProps {
  person: People
}

export const Person: React.FC<PersonProps> = ({ person }) => {
  const { dispatch } = React.useContext(SwapiContext)

  const handleClick = (person: string, film: string) => {
    dispatch({
      type: ActionTypes.SetSelected,
      payload: {
        selectedPerson: person,
        selectedFilm: film
      }
    })
  }

  const { films, name } = person

  return (
    <div style={{ border: '1px solid black', padding: '1em', margin: '.5em' }}>
      {name}
      <div style={{ width: '100%' }}>
        {films.length > 0 &&
          films.map(film => (
            <Link href={'/film'} as={'/film'} key={film}>
              <div style={{ width: '100%' }} onClick={() => handleClick(person.name, film)}>
                <a>{film}</a>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}
