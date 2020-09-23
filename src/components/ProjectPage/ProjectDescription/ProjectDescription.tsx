import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'

import styles from './ProjectDescription.module.scss'
// import Danshina from '../../../assets/images/authors/danshina.svg'
import { curators } from '../../../fixtures'

const ProjectDescription: FC = () => {
  const renderCurators = (): JSX.Element[] => {
    return curators.map(curator => {
      return (
        <li className={styles.curator} key={curator.id}>
          <NavLink to="/curators" className={styles.curatorWrapper}>
            <img
              className={styles.curatorImg}
              src={curator.image}
              alt="Фото куратора"
            />
            <h3 className={styles.curatorName}>{curator.name}</h3>
            <span className={styles.curatorStatus}>{curator.status}</span>
          </NavLink>
        </li>
      )
    })
  }

  return (
    <div className={styles.description}>
      <p className={styles.descriptionContent}>
        Приложение можно назвать «родным» для операционных систем – Android,
        IOS, WinPhone . Такие мобильные приложения пишутся на языках
        программирования, утвержденных разработчиками программного обеспечения
        под каждую конкретную платформу, а потому органично встраиваются в сами
        операционные системы. Приложения загружаются через магазины приложений
        (App Store, Google Play и т.д.) и соответствуют требованиям этих
        магазинов.
      </p>
      <ul className={styles.curators}>{renderCurators()}</ul>
    </div>
  )
}

export default ProjectDescription
