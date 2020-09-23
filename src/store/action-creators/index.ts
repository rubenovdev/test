import { Dispatch } from 'redux'

import { FetchProjectsActionTypes } from '../../models/store/fetch-projects-action-types'
import {
  FETCH_PROJECTS_START,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAIL,
} from './../common'

export const fetchProjects = () => (
  dispatch: Dispatch<FetchProjectsActionTypes>
): void => {
  dispatch({
    type: FETCH_PROJECTS_START,
  })
  fetch('https://api.teamunite.ru/api/v1/projects/active')
    .then(res => res.json())
    .then(res =>
      dispatch({
        type: FETCH_PROJECTS_SUCCESS,
        response: res.data,
      })
    )
    .catch(error => {
      dispatch({
        type: FETCH_PROJECTS_FAIL,
        error,
      })
    })
}
