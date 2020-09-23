import {
  CREATE_VACANCY,
  EDIT_VACANCY,
  DELETE_VACANCY,
  VacancyActionTypes,
} from './types'
import { Vacancy } from '../../models/store/profile'

export const createVacancy = (vacancy: Vacancy): VacancyActionTypes => ({
  type: CREATE_VACANCY,
  payload: vacancy,
})

export const editVacancy = (
  _id: string,
  newVacancy: Vacancy
): VacancyActionTypes => ({
  type: EDIT_VACANCY,
  payload: { _id, newVacancy },
})

export const deleteVacancy = (_id: string): VacancyActionTypes => ({
  type: DELETE_VACANCY,
  payload: _id,
})
