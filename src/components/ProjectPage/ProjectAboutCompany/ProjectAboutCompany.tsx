import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'

import styles from './ProjectAboutCompany.module.scss'
import Tinkoff from '../../../assets/images/tinkoff.svg'
import Layers from '../../../assets/images/layers.svg'
import Case from '../../../assets/images/case.svg'

const ProjectAboutCompany: FC = () => {
  return (
    <div className={styles.aboutCompany}>
      <div className={styles.aboutCompanyInfo}>
        <NavLink to="/company" className={styles.aboutCompanyLogo}>
          <img src={Tinkoff} alt="Логотип компании" />
        </NavLink>
        <h3 className={styles.companyDescription}>
          Онлайн-экосистема, основанная на финансовых и лайфстайл-услугах
        </h3>
        <ul className={styles.benefits}>
          <li className={styles.benefit}>
            <NavLink to="/company-skills" className={styles.benefitWrapper}>
              <img
                className={styles.benefitIcon}
                src={Layers}
                alt="Доступные проекты"
              />
              <span className={styles.benefitTitle}>Доступные проекты: 5</span>
            </NavLink>
          </li>
          <li className={styles.benefit}>
            <NavLink to="/company-skills" className={styles.benefitWrapper}>
              <img className={styles.benefitIcon} src={Case} alt="Стажировка" />
              <span className={styles.benefitTitle}>Возможна стажировка</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <p className={styles.addInfo}>
        Тинькофф — технологическая компания с банковской лицензией. Примерно 70%
        сотрудников штаб-квартиры — IT-специалисты, которые каждый день создают
        лучшие цифровые продукты в России
      </p>
    </div>
  )
}

export default ProjectAboutCompany
