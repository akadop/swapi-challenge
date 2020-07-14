import React from 'react'
import { SwapiContext } from '../core/data/swapi-provider'
import { Film } from '../core/data/swapi-types'
import useSWR from 'swr'
import { ActionTypes } from '../core/data/action-reducer'

const FilmPage: React.FC = () => {
  const [film, setFilm] = React.useState(null)
  const { data } = useSWR('SWAPI_ALL_FILMS_ENDPOINT')
  const { dispatch, state } = React.useContext(SwapiContext)

  const {
    state: { selectedFilm, selectedPerson }
  } = React.useContext(SwapiContext)

  React.useEffect(() => {
    if (data) {
      dispatch({
        type: ActionTypes.AddFilms,
        payload: {
          films: data.results
        }
      })
    }
  }, [data])

  React.useEffect(() => {
    if (selectedFilm !== null && state.films.length > 0) {
      const selected = state.films.find(film => film.url === selectedFilm)
      setFilm(selected)
    }
  }, [selectedFilm, data])

  if (selectedPerson !== null && film !== null) {
    return (
      <React.Fragment>
        <div style={{ width: '100%' }}>
          <h2>{(film as Film).title}</h2>
        </div>
        <div style={{ width: '100%' }}>
          <h3>Released {(film as Film).release_date}</h3>
        </div>
        <div style={{ width: '100%' }}>
          you are visiting this page because you clicked on a movie starring <h3>{selectedPerson}</h3>
        </div>
      </React.Fragment>
    )
  }

  return <div> need to select a person </div>
}

export default FilmPage
