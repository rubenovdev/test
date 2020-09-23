import React, { FC, useState } from 'react'
import classNames from 'classnames'

import styles from './ProjectVacancy.module.scss'
import { vacancies } from '../../../fixtures'
import BlackUser from '../../../assets/images/black-user.svg'
import WhiteUser from '../../../assets/images/white-user.svg'
import RightChevron from '../../../assets/images/right-chevron.svg'

const ProjectVacancy: FC = () => {
  const [activeVacancyIndex, setActiveVacancyIndex] = useState<number | null>(
    null
  )

  const renderSelectVancancyWarningOrSkills = (): JSX.Element | false => {
    return activeVacancyIndex === null ? (
      <div className={styles.selectVacancyWarningWrapper}>
        <h3 className={styles.selectVacancyWarning}>
          Выберите вакансию для просмотра
        </h3>
      </div>
    ) : (
      <div className={styles.separateSkills}>
        <h3 className={styles.skillsTitle}>Необходимые навыки</h3>
        <p className={styles.skillsDescription}>
          {vacancies[activeVacancyIndex].skills}
        </p>
      </div>
    )
  }

  const onVacancyClick = (id: number): void => {
    const index = id === activeVacancyIndex ? null : id
    setActiveVacancyIndex(index)
  }

  const renderUserIcon = (id: number): JSX.Element => {
    const path = id === activeVacancyIndex ? WhiteUser : BlackUser

    return (
      <img className={styles.userIcon} src={path} alt="Иконка пользователя" />
    )
  }

  const renderRightChevronVisibility = (id: number): string => {
    return id === activeVacancyIndex
      ? styles.rightChevron
      : styles.noRightChevron
  }

  const renderVacancies = (): JSX.Element[] => {
    return vacancies.map(vacancy => {
      const vacancyContentClass = classNames(
        styles.vacancyContent,
        activeVacancyIndex === vacancy.id && styles.activeVacancyContent
      )

      return (
        <li className={styles.vacancy} key={vacancy.id}>
          <div
            className={vacancyContentClass}
            onClick={(): void => onVacancyClick(vacancy.id)}
          >
            <h3 className={styles.vacancyName}>{vacancy.name}</h3>
            <div className={styles.vacancyRateWrapper}>
              {renderUserIcon(vacancy.id)}
              <span className={styles.vacancyRate}>{vacancy.rate}</span>
              <img
                className={renderRightChevronVisibility(vacancy.id)}
                src={RightChevron}
                alt="Подробно"
              />
            </div>
          </div>
          {activeVacancyIndex === vacancy.id && (
            <div className={styles.skills}>
              <h3 className={styles.skillsTitle}>Необходимые навыки</h3>
              <p className={styles.skillsDescription}>{vacancy.skills}</p>
            </div>
          )}
        </li>
      )
    })
  }

  return (
    <div className={styles.vacanciesWrapper}>
      {renderSelectVancancyWarningOrSkills()}
      <ul className={styles.vacancies}>{renderVacancies()}</ul>
    </div>
  )
}

export default ProjectVacancy
