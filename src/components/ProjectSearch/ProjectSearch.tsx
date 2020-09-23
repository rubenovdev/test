import React, { FC, useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchProjects } from '../../store/action-creators'
import styles from './ProjectSearch.module.scss'
import InteractiveButton from '../InteractiveButton/InteractiveButton'
import CustomSelect from '../CustomSelect/CustomSelect'
import Project from '../Project/Project'
import { RootState } from '../../store/reducers'
import { ProfilesData } from '../../models/store/profile'
import ProjectSearchFilters from '../ProjectSearchFilters/ProjectSearchFilters'

const ProjectSearch: FC<Props> = ({
  projects,
  projectsLoading,
  projectsLoaded,
  fetchProjects,
}) => {
  useEffect(() => {
    !projectsLoading && !projectsLoaded && fetchProjects()
  }, [fetchProjects, projectsLoading, projectsLoaded])

  const [selectedItem, setSelectedItem] = useState<string>('Сначала новые')

  const selectData: Array<string> = [
    'Сначала новые',
    'Сначала старые',
    'Сначала долгосрочные',
    'Сначала краткосрочные',
  ]

  const [filtersIsActive, setFiltersIsActive] = useState<boolean>(false)

  if (!projects && projectsLoaded) {
    return <div>Данные отсутствуют</div>
  }

  if (projectsLoading) {
    return <div>Загрузка...</div>
  }

  return (
    <>
      <h1 className={styles.tittle}>Поиск проектов</h1>
      <div className={styles.searchWrapper}>
        <label className={styles.searchLabel}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Поиск"
          />
        </label>
        <CustomSelect
          title={selectedItem}
          list={selectData}
          selectedItem={setSelectedItem}
          selectStyle={'searchProject'}
        />
        <InteractiveButton
          buttonStyle={'filters'}
          text={'Фильтры'}
          isActive={filtersIsActive}
          setIsActive={setFiltersIsActive}
        />
        {filtersIsActive && <ProjectSearchFilters />}
      </div>
      <ul className={styles.projects}>
        {projects.map(project => (
          <Project
            key={project._id}
            id={project._id}
            company={project.company.name}
            logo={project.company.logo}
            description={project.description}
          />
        ))}
      </ul>
    </>
  )
}

interface Props {
  projects: Array<ProfilesData>
  projectsLoading: boolean
  projectsLoaded: boolean
  fetchProjects: Function
}

const mapStateToProps = (state: RootState) => ({
  projects: state.projects.entities,
  projectsLoading: state.projects.loading,
  projectsLoaded: state.projects.loaded,
})

const mapDispatchToProps = {
  fetchProjects,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSearch)
