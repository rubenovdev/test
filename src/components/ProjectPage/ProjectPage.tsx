import React, { FC } from 'react'

import styles from './ProjectPage.module.scss'
import Tabs from '../Tabs/Tabs'
import ProjectHeader from './ProjectHeader/ProjectHeader'
import ProjectDescription from './ProjectDescription/ProjectDescription'
import ProjectVanacy from './ProjectVacancy/ProjectVacancy'
import ProjectAboutCompany from './ProjectAboutCompany/ProjectAboutCompany'

const ProjectPage: FC<Props> = ({
  location: {
    state: { description },
  },
}) => {
  return (
    <div className={styles.mainContent}>
      <ProjectHeader
        description={description}
        subtitle="Факультет информационных технологий"
        isButton={true}
      />
      <Tabs tabsStyle={'projectPage'}>
        <ProjectDescription data-tabname="Описание" />
        <ProjectVanacy data-tabname="Вакансии" />
        <ProjectAboutCompany data-tabname="О компании" />
      </Tabs>
    </div>
  )
}

export default ProjectPage

interface Props {
  location: {
    state: {
      description: string
    }
  }
}
