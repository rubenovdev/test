import { Curator } from '../../models/store/profile'

export interface CuratorsState {
  [id: string]: Curator
}

export const ADD_CURATOR = 'ADD_CURATOR'

export const REMOVE_CURATOR = 'REMOVE_CURATOR'

interface AddCuratorActionType {
  type: typeof ADD_CURATOR
  payload: Curator
}

interface RemoveCuratorActionType {
  type: typeof REMOVE_CURATOR
  payload: string
}

export type CuratorsActionTypes = AddCuratorActionType | RemoveCuratorActionType
