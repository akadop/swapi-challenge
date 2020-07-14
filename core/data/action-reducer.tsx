import { SwapiState } from './swapi-provider'
import { Film, People } from './swapi-types'

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export enum ActionTypes {
  AddData = 'ADD_DATA',
  RemoveSelected = 'REMOVE_SELECTED',
  SetNextPage = 'SET_NEXT_PAGE',
  SetSelected = 'SET_SELECTED'
}

type SwapiPayload = {
  [ActionTypes.SetSelected]: Pick<SwapiState, 'selectedPerson' | 'selectedFilm'>
  [ActionTypes.SetNextPage]: { nextPersonPage: string }
  [ActionTypes.RemoveSelected]: {
    selectedPerson: null
    selectedFilm: null
  }
  [ActionTypes.AddData]: {
    people: People[]
    films: Film[]
  }
}

export type SwapiActions = ActionMap<SwapiPayload>[keyof ActionMap<SwapiPayload>]

export const swapiReducer = (state: SwapiState, action: SwapiActions) => {
  switch (action.type) {
    case ActionTypes.AddData:
      return {
        ...state,
        films: Array.from(new Set(state.films.concat(action.payload.films))),
        people: Array.from(new Set(state.people.concat(action.payload.people)))
      }

    case ActionTypes.SetNextPage:
      return {
        ...state,
        nextPersonPage: action.payload.nextPersonPage
      }

    case ActionTypes.SetSelected:
      return {
        ...state,
        selectedFilm: action.payload.selectedFilm,
        selectedPerson: action.payload.selectedPerson
      }

    case ActionTypes.RemoveSelected:
      return {
        ...state,
        selectedPerson: null,
        selectedFilm: null
      }

    default:
      return state
  }
}
