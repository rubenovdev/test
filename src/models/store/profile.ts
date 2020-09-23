export interface ProfilesState {
  loading: boolean
  loaded: boolean
  error: null | string
  entities: Array<ProfilesData>
}

export interface ProfilesData {
  vacancies: Array<Vacancy>
  curators: Array<Curator>
  status: string
  createdAt: number
  _id: string
  name: string
  description: string
  faculty: string
  company: Company
}

export interface Vacancy {
  _id: string
  name: string
  description: string
  quantity: number
}

export interface Curator {
  _id: string
  name: string
  surname: string
  status: string
}

export interface Company {
  projects: Array<string>
  _id: string
  name: string
  sphereOfActivity: string
  description: string
  logo: string
  isAvailableInternship: boolean
}
