import React, { FC } from 'react'

import boldRightArrow from '../../assets/images/arrows/bold-right-arrow.svg'
import lightRightArrow from '../../assets/images/arrows/light-right-arrow.svg'
import styles from './RightArrowButton.module.scss'

const RightArrowButton: FC = () => {
  return (
    <>
      <img
        className={styles.bold}
        src={boldRightArrow}
        alt="следующее объявление"
      />
      <img
        className={styles.light}
        src={lightRightArrow}
        alt="следующее объявление"
      />
    </>
  )
}

export default RightArrowButton
