import React, { FC, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { announcements } from '../../fixtures'
import leftArrow from '../../assets/images/arrows/left-arrow.svg'
import danshina from '../../assets/images/authors/danshina.svg'
import styles from './AnnouncementsPage.module.scss'
import StarButton from '../StarButton/StarButton'
import RightArrowButton from '../RightArrowButton/RightArrowButton'

const AnnouncementsPage: FC<Props> = ({ location }: Props) => {
  const [selectedAnnouncementIndex, setSelectedAnnouncementIndex] = useState(
    location.state.selectedIndex
  )
  const { text, author, date } = announcements[selectedAnnouncementIndex]

  const [isStarButtonClicked, setIsStarButtonClicked] = useState(false)

  const renderAnnouncements = (): JSX.Element[] => {
    return announcements.map(announcement => {
      return (
        <li className={styles.announcement} key={announcement.id}>
          <p className={styles._text}>{announcement.text}</p>
          <img
            className={styles._authorImage}
            src={danshina}
            alt="Автор объявления"
          />
          <p className={styles._author}>{announcement.author}</p>
          <time className={styles._date}>{announcement.date}</time>
        </li>
      )
    })
  }

  const onStarButtonClick = (): void => {
    setIsStarButtonClicked(!isStarButtonClicked)
  }

  const onRightArrowClick = (): void => {
    setSelectedAnnouncementIndex(
      selectedAnnouncementIndex === announcements.length - 1
        ? 0
        : selectedAnnouncementIndex + 1
    )
  }

  return (
    <>
      <h2 className={styles.pageTitle}>Объявления</h2>
      <div
        className={
          announcements.length > 1
            ? styles.announcementsWrapper
            : styles.noAnnouncementsWrapper
        }
      >
        <section className={styles.selectedAnnouncement}>
          <h2 className="visually-hidden">Объявление</h2>
          <div className={styles.content}>
            <div className={styles.header}>
              <p className={styles.title}>{text}</p>
              <button
                type="button"
                className={styles.starButton}
                onClick={onStarButtonClick}
              >
                <StarButton clicked={isStarButtonClicked} />
                <span className={styles.saveButtonText}>Сохранить</span>
              </button>
            </div>
            <p className={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud
            </p>
            <div className={styles.authorWrapper}>
              <img
                className={styles.authorImage}
                src={danshina}
                alt="Автор объявления"
              />
              <p className={styles.authorName}>{author}</p>
              <time className={styles.publishDate}>{date}</time>
            </div>
          </div>
          <div className={styles.controlPanel}>
            <NavLink to="/" className={styles.leftPanelSide}>
              <img
                className={styles.leftArrow}
                src={leftArrow}
                alt="Перейти на главную"
              />
              <span className={styles.leftPanelText}>На главную</span>
            </NavLink>
            <div>
              <button
                className={
                  announcements.length > 1
                    ? styles.rightPanelSide
                    : styles.noRightPanelSide
                }
                type="button"
                onClick={onRightArrowClick}
              >
                <span className={styles.rightPanelText}>Следующее</span>
                <span className={styles.rightArrow}>
                  <RightArrowButton />
                </span>
              </button>
            </div>
          </div>
        </section>
        <section>
          <h2 className="visually-hidden">Следующие объявления</h2>
          <ul
            className={
              announcements.length > 1
                ? styles.announcements
                : styles.noAnnouncements
            }
          >
            {renderAnnouncements()}
          </ul>
        </section>
      </div>
    </>
  )
}

export default AnnouncementsPage

interface Props {
  location: {
    state: {
      selectedIndex: number
    }
  }
}
