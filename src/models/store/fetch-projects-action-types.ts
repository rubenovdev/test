import {
  FETCH_PROJECTS_START,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAIL,
} from './../../store/common'
import { ProfilesData } from './profile'

interface FetchProjectsStartActionType {
  type: typeof FETCH_PROJECTS_START
}

interface FetchProjectsSuccessActionType {
  type: typeof FETCH_PROJECTS_SUCCESS
  response: Array<ProfilesData>
}

interface FetchProjectsFailActionType {
  type: typeof FETCH_PROJECTS_FAIL
  error: null | string
}

export type FetchProjectsActionTypes =
  | FetchProjectsStartActionType
  | FetchProjectsSuccessActionType
  | FetchProjectsFailActionType
