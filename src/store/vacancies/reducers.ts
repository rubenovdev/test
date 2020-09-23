import {
  CREATE_VACANCY,
  EDIT_VACANCY,
  DELETE_VACANCY,
  VacanciesState,
  VacancyActionTypes,
} from './types'

const initialState: VacanciesState = {}

export const vacanciesReducer = (
  state = initialState,
  action: VacancyActionTypes
): VacanciesState => {
  switch (action.type) {
    case CREATE_VACANCY:
      return { ...state, [action.payload._id]: action.payload }
    case EDIT_VACANCY:
      return { ...state, [action.payload._id]: action.payload.newVacancy }
    case DELETE_VACANCY:
      const { [action.payload]: deletedValue, ...newState } = state
      return newState
    default:
      return state
  }
}
