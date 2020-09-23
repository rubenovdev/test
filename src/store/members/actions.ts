import {
  CREATE_MEMBER,
  DELETE_MEMBER,
  MemberActionTypes,
  Member,
} from './types'

export const createMember = (member: Member): MemberActionTypes => ({
  type: CREATE_MEMBER,
  payload: member,
})

export const deleteMember = (_id: string): MemberActionTypes => ({
  type: DELETE_MEMBER,
  payload: _id,
})
