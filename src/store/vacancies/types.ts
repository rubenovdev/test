import { Vacancy } from '../../models/store/profile'

export interface VacanciesState {
  [id: string]: Vacancy
}

export const CREATE_VACANCY = 'CREATE_VACANCY'

export const EDIT_VACANCY = 'EDIT_VACANCY'

export const DELETE_VACANCY = 'DELETE_VACANCY'

interface CreateVacancyActionType {
  type: typeof CREATE_VACANCY
  payload: Vacancy
}

interface EditVacancyActionType {
  type: typeof EDIT_VACANCY
  payload: { _id: string; newVacancy: Vacancy }
}

interface DeleteVacancyActionType {
  type: typeof DELETE_VACANCY
  payload: string
}

export type VacancyActionTypes =
  | CreateVacancyActionType
  | EditVacancyActionType
  | DeleteVacancyActionType
