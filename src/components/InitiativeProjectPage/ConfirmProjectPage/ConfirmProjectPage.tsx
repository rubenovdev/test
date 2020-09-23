import React, { FC } from 'react'

import styles from './ConfirmProjectPage.module.scss'

const ConfirmProjectPage: FC = () => {
  return (
    <>
      <h2 className={styles.title}>Ваша заявка отправлена</h2>
      <div className={styles.confirmMessageWrapper}>
        <div className={styles.confirmMessage}>
          Благодарим за проявление инициативы бла-бла-бла
        </div>
      </div>
    </>
  )
}

export default ConfirmProjectPage
