import {
  ADD_CURATOR,
  REMOVE_CURATOR,
  CuratorsState,
  CuratorsActionTypes,
} from './types'

const initialState: CuratorsState = {}

export const curatorsReducer = (
  state = initialState,
  action: CuratorsActionTypes
): CuratorsState => {
  switch (action.type) {
    case ADD_CURATOR:
      return { ...state, [action.payload._id]: action.payload }
    case REMOVE_CURATOR:
      const { [action.payload]: deletedValue, ...newState } = state
      return newState
    default:
      return state
  }
}
