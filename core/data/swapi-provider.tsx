import React from 'react'
import { Film, People } from './swapi-types'
import { SwapiActions, swapiReducer } from './action-reducer'

export type SwapiState = {
  nextPersonPage: null | string
  selectedPerson: null | People['name']
  selectedFilm: null | Film['title']
  films: Film[]
  people: People[]
}

const initialSwapiState: SwapiState = {
  nextPersonPage: null,
  selectedFilm: null,
  selectedPerson: null,
  people: [],
  films: []
}

const SwapiContext = React.createContext<{
  state: SwapiState
  dispatch: React.Dispatch<SwapiActions>
}>({
  state: initialSwapiState,
  dispatch: () => null
})

export const SwapiProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(swapiReducer, initialSwapiState)
  return <SwapiContext.Provider value={{ state, dispatch }}>{children}</SwapiContext.Provider>
}
