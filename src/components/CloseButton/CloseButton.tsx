import React, { FC } from 'react'

import styles from './CloseButton.module.scss'
import boldCloseButton from '../../assets/images/bold-close-button.svg'
import lightCloseButton from '../../assets/images/light-close-button.svg'

const CloseButton: FC = () => {
  return (
    <>
      <img
        className={styles.lightCloseButton}
        src={lightCloseButton}
        alt="Закрыть модальное окно"
      />
      <img
        className={styles.boldCloseButton}
        src={boldCloseButton}
        alt="Закрыть модальное окно"
      />
    </>
  )
}

export default CloseButton
