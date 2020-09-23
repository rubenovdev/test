import { ADD_CURATOR, REMOVE_CURATOR, CuratorsActionTypes } from './types'
import { Curator } from '../../models/store/profile'

export const addCurator = (curator: Curator): CuratorsActionTypes => ({
  type: ADD_CURATOR,
  payload: curator,
})

export const removeCurator = (id: string): CuratorsActionTypes => ({
  type: REMOVE_CURATOR,
  payload: id,
})
