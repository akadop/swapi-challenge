import React from 'react'
import { SwapiContext } from '../core/data/swapi-provider'
import { Film } from '../core/data/swapi-types'
import useSWR from 'swr'

const FilmPage: React.FC = () => {
  const [film, setFilm] = React.useState(null)
  const { data } = useSWR('SWAPI_ALL_FILMS_ENDPOINT')

  const {
    state: { selectedFilm, selectedPerson }
  } = React.useContext(SwapiContext)

  React.useEffect(() => {
    if (selectedFilm !== null && data) {
      const selected = (data.results as Film[]).find(film => film.url === selectedFilm)
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
