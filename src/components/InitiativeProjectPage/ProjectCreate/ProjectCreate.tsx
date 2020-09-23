import React, { FC, useState, MouseEvent } from 'react'

import styles from './ProjectCreate.module.scss'
import Toggle from '../../Toggle/Toggle'
import Accordion from '../../Accordion/Accordion'
import ProjectDescription from '../ProjectDescription/ProjectDescription'
import ProjectVacancies from '../ProjectVacancies/ProjectVacancies'
import ProjectCurators from '../ProjectCurators/ProjectCurators'
import ProjectTeam from '../ProjectTeam/ProjectTeam'

const ProjectCreate: FC = () => {
  const [isLastStep, setIsLastStep] = useState(false)

  const onToggle = (event: MouseEvent): void => {
    event.persist()
    setIsLastStep(prevState =>
      (event.target as HTMLElement).tagName === 'INPUT' ? !prevState : prevState
    )
  }

  const renderLastStep = (): JSX.Element | false => {
    return (
      isLastStep && (
        <Accordion
          title="Шаг 4. Добавление текущего состава команды"
          content={<ProjectTeam />}
        />
      )
    )
  }

  return (
    <>
      <header className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Создание инициативного проекта</h2>
        <div className={styles.toggle} onClick={onToggle}>
          <Toggle title="Добавить текущий состав команды" />
        </div>
      </header>

      <div className={styles.steps}>
        <Accordion
          title="Шаг 1. Описание проекта"
          content={<ProjectDescription />}
        />
        <Accordion
          title="Шаг 2. Добавление вакансий"
          content={<ProjectVacancies />}
        />
        <Accordion
          title="Шаг 3. Выбор куратора"
          content={<ProjectCurators />}
        />
        {renderLastStep()}
      </div>
    </>
  )
}

export default ProjectCreate
