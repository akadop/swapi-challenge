import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { SwapiContext, SwapiProvider } from './swapi-provider'
import { ActionTypes } from './action-reducer'

const mockPerson = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: 'http://swapi.dev/api/planets/1/',
  films: ['http://swapi.dev/api/films/1/'],
  species: [],
  vehicles: ['http://swapi.dev/api/vehicles/14/', 'http://swapi.dev/api/vehicles/30/'],
  starships: ['http://swapi.dev/api/starships/12/', 'http://swapi.dev/api/starships/22/'],
  created: new Date('2014-12-09T13:50:51.644000Z'),
  edited: new Date('2014-12-20T21:17:56.891000Z'),
  url: 'http://swapi.dev/api/people/1/'
}

const TestProviderComponent = () => {
  const { dispatch } = React.useContext(SwapiContext)

  return (
    <React.Fragment>
      <button
        data-testid={'buttontest'}
        onClick={() =>
          dispatch({
            type: ActionTypes.SetSelected,
            payload: {
              selectedPerson: mockPerson.name,
              selectedFilm: 'http://swapi.dev/api/films/1/'
            }
          })
        }
      ></button>
    </React.Fragment>
  )
}

const TestTextComponent = () => {
  const { state } = React.useContext(SwapiContext)
  return (
    <React.Fragment>
      <h3 data-testid={'testClick'}>{(state.selectedFilm && state.selectedFilm) || 'nope1'}</h3>
      <h3 data-testid={'testClick2'}>{(state.selectedPerson && state.selectedPerson) || 'nope2'}</h3>
    </React.Fragment>
  )
}

afterEach(cleanup)

it('changes state on click', () => {
  const { getByTestId } = render(
    <SwapiProvider>
      <TestProviderComponent />
      <TestTextComponent />
    </SwapiProvider>
  )

  const selectedFilm = getByTestId('testClick')
  expect(selectedFilm).toHaveTextContent('nope1')

  const selectedPerson = getByTestId('testClick2')
  expect(selectedPerson).toHaveTextContent('nope2')

  const movieLink = getByTestId('buttontest')
  fireEvent.click(movieLink)

  expect(selectedPerson).toHaveTextContent('Luke Skywalker')
  expect(selectedFilm).toHaveTextContent('http://swapi.dev/api/films/1/')
})
