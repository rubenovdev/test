import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'

import styles from './ProjectHeader.module.scss'
import Tinkoff from '../../../assets/images/tinkoff.svg'
import Button from '../../Button/Button'

const ProjectHeader: FC<Props> = ({ description, subtitle, isButton }) => {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logoAndTitle}>
          <NavLink to="/company" className={styles.headerCompanyLogo}>
            <img src={Tinkoff} alt="Логотип компании" />
          </NavLink>

          <h1 className={styles.headerTitle}>{description}</h1>
        </div>

        <h3 className={styles.headerSubtitle}>{subtitle}</h3>
      </div>

      {isButton && (
        <NavLink to="/sign" className={styles.signBtn}>
          <Button text="Записаться" buttonStyle="enter" />
        </NavLink>
      )}
    </div>
  )
}

interface Props {
  description: string
  subtitle: string
  isButton: boolean
}

export default ProjectHeader
