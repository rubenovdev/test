export interface Member {
  _id: string
  path: string
  name: string
  vacancy: string
}

export interface MembersState {
  [id: string]: Member
}

export const CREATE_MEMBER = 'CREATE_MEMBER'

export const DELETE_MEMBER = 'DELETE_MEMBER'

interface CreateMemberActionType {
  type: typeof CREATE_MEMBER
  payload: Member
}

interface DeleteMemberActionType {
  type: typeof DELETE_MEMBER
  payload: string
}

export type MemberActionTypes = CreateMemberActionType | DeleteMemberActionType
