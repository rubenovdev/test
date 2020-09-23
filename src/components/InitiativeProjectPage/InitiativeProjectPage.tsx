import React, { FC, useState } from 'react'

import styles from './InitiativeProjectPage.module.scss'
import { NavLink } from 'react-router-dom'
import ProjectCreate from './ProjectCreate/ProjectCreate'
import CheckProjectPage from './CheckProjectPage/CheckProjectPage'
import ConfirmProjectPage from './ConfirmProjectPage/ConfirmProjectPage'
import Button from '../Button/Button'

const InitiativeProjectPage: FC = () => {
  const [completeCounter, setCompleteCounter] = useState(0)

  const onCompleteButtonClick = (): void => {
    setCompleteCounter(prevState => ++prevState)
  }

  const onGoBackButtonClick = (): void => {
    setCompleteCounter(0)
  }

  const renderPage = (): JSX.Element | undefined => {
    switch (completeCounter) {
      case 0:
        return <ProjectCreate />
      case 1:
        return <CheckProjectPage />
      case 2:
        return <ConfirmProjectPage />
    }
  }

  return (
    <>
      {renderPage()}
      {completeCounter !== 2 && (
        <div className={styles.button} onClick={onCompleteButtonClick}>
          <Button text="Завершить" buttonStyle="enter" />
        </div>
      )}
      {completeCounter === 1 && (
        <div className={styles.button} onClick={onGoBackButtonClick}>
          <Button text="Вернуться к редактированию" buttonStyle="detailed" />
        </div>
      )}
      {completeCounter === 2 && (
        <NavLink to="/projects-search" className={styles.button}>
          <Button text="К поиску проектов" buttonStyle="detailed" />
        </NavLink>
      )}
    </>
  )
}

export default InitiativeProjectPage
