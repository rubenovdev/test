import React, { FC } from 'react'

import hourglass from '../../assets/images/hourglass.svg'
import projectsSearch from '../../assets/images/projects-search.svg'
import initiativeProject from '../../assets/images/initiative-project.svg'
import engeneerActivity from '../../assets/images/engeneer-activity.svg'
import partnersProjects from '../../assets/images/partners-projects.svg'
import styles from './Homepage.module.scss'
import MenuCard from '../MenuCard/MenuCard'
import AnnouncementBoard from '../AnnouncementBoard/AnnouncementBoard'

const Homepage: FC = () => {
  return (
    <>
      <h2 className={styles.homeTitle}>Главная</h2>

      <div className={styles.mainContent}>
        <article className={styles.daysTimer}>
          <p className={styles.daysTimerText}>До защиты осталось</p>
          <div className={styles.daysTimerCounter}>
            <p className={styles.daysTimerCounterText}>15 дней</p>
            <div className={styles.daysTimerCounterImg}>
              <img src={hourglass} alt="Песочные часы" />
            </div>
          </div>
        </article>
        <section>
          <h2 className="visually-hidden">Меню</h2>
          <ul className={styles.mainMenu}>
            <MenuCard
              title="Поиск проектов"
              href="projects-search"
              path={projectsSearch}
            />
            <MenuCard
              title="Инженерное проектирование"
              href="engeneer-activity"
              path={engeneerActivity}
            />
            <MenuCard
              title="Инициативный проект"
              href="initiative-project"
              path={initiativeProject}
            />
            <MenuCard
              title="Проекты партнеров"
              href="partners-projects"
              path={partnersProjects}
            />
          </ul>
        </section>
        <AnnouncementBoard />
      </div>
    </>
  )
}

export default Homepage
