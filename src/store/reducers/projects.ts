import { FetchProjectsActionTypes } from './../../models/store/fetch-projects-action-types'
import { ProfilesState } from './../../models/store/profile'
import {
  FETCH_PROJECTS_START,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAIL,
} from './../common'

const initialState: ProfilesState = {
  loading: false,
  loaded: false,
  error: null,
  entities: [],
}

export const projectsReducer = (
  profilesState = initialState,
  action: FetchProjectsActionTypes
): ProfilesState => {
  switch (action.type) {
    case FETCH_PROJECTS_START:
      return {
        ...profilesState,
        loading: true,
      }
    case FETCH_PROJECTS_SUCCESS:
      return {
        ...profilesState,
        loading: false,
        loaded: true,
        error: null,
        entities: action.response,
      }
    case FETCH_PROJECTS_FAIL:
      return {
        ...profilesState,
        loading: false,
        loaded: false,
        error: action.error,
      }
    default:
      return profilesState
  }
}
