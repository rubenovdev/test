import React, { FC } from 'react'

import styles from './CheckProjectPage.module.scss'
import ProjectHeader from '../../ProjectPage/ProjectHeader/ProjectHeader'
import Tabs from '../../Tabs/Tabs'
import ProjectDescription from '../../ProjectPage/ProjectDescription/ProjectDescription'
import ProjectVacancy from '../../ProjectPage/ProjectVacancy/ProjectVacancy'

const ConfirmProjectPage: FC = () => {
  return (
    <div className={styles.container}>
      <ProjectHeader
        description="Разработка мобильного приложения на базе Android"
        subtitle="Инициативный проект"
        isButton={false}
      />
      <Tabs>
        <ProjectDescription data-tabname="Описание" />
        <ProjectVacancy data-tabname="Вакансии" />
      </Tabs>
    </div>
  )
}

export default ConfirmProjectPage
