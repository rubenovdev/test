import {
  CREATE_MEMBER,
  DELETE_MEMBER,
  MembersState,
  MemberActionTypes,
} from './types'

const initialState: MembersState = {}

export const membersReducer = (
  state = initialState,
  action: MemberActionTypes
): MembersState => {
  switch (action.type) {
    case CREATE_MEMBER:
      return { ...state, [action.payload._id]: action.payload }
    case DELETE_MEMBER:
      const { [action.payload]: deletedValue, ...newState } = state
      return newState
    default:
      return state
  }
}
