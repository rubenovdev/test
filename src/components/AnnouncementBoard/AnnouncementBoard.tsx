import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { announcements } from '../../fixtures'
import styles from './AnnouncementBoard.module.scss'
import Button from '../Button/Button'

const AnnouncementBoard: FC = () => {
  const renderAnnouncements = (): JSX.Element[] => {
    return announcements.map(announcement => {
      return (
        <li key={announcement.id} className={styles.announcementWrapper}>
          <NavLink
            to={{
              pathname: '/announcements',
              state: {
                selectedIndex: announcement.id,
              },
            }}
            className={styles.announcement}
          >
            <p className={styles.announcementText}>{announcement.text}</p>
            <NavLink to="/author" className={styles.announcementAuthor}>
              {announcement.author}
            </NavLink>
          </NavLink>
        </li>
      )
    })
  }

  const renderAnnouncementsWrapperContent = (): JSX.Element => {
    return announcements.length ? (
      <div className={styles.announcementsWrapper}>
        <ul className={styles.announcements}>{renderAnnouncements()}</ul>
        <div className={styles.announcementsButtonWrapper}>
          <Button buttonStyle={'detailed'} text={'Посмотреть все'} />
        </div>
      </div>
    ) : (
      <div className={styles.noAnnouncementsWrapper}>
        <h3 className={styles.noAnnouncementsTitle}>Объявления отсутствуют</h3>
      </div>
    )
  }

  return (
    <section className={styles.announcementBoard}>
      <div className={styles.announcementBoardTitleWrapper}>
        <h2 className={styles.announcementBoardTitle}>Доска объявлений</h2>
      </div>
      {renderAnnouncementsWrapperContent()}
    </section>
  )
}

export default AnnouncementBoard
