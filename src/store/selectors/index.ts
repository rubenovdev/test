import { createSelector } from 'reselect'

import { Vacancy } from './../../models/store/profile'
import { RootState } from '../reducers/index'
import { arrayToMap } from './../utils'

export const selectId = (_: RootState, ownProps: { id: string }) => ownProps.id

export const selectProjects = (state: RootState) =>
  arrayToMap(state.projects.entities)

export const selectCountPlaces = createSelector(
  selectProjects,
  selectId,
  (projects, id): number => {
    if (projects[id] && projects[id].vacancies) {
      return projects[id].vacancies.reduce(
        (result: number, vacancy: Vacancy) => {
          return result + vacancy.quantity
        },
        0
      )
    }
    return 0
  }
)
