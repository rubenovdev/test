import { combineReducers } from 'redux'

import { projectsReducer } from './projects'
import { vacanciesReducer } from '../vacancies/reducers'
import { curatorsReducer } from '../curators/reducers'
import { membersReducer } from '../members/reducers'

export const rootReducer = combineReducers({
  projects: projectsReducer,
  vacancies: vacanciesReducer,
  curators: curatorsReducer,
  members: membersReducer,
})

export type RootState = ReturnType<typeof rootReducer>
