import React, { FC } from 'react'

import styles from './Toggle.module.scss'

const Toggle: FC<Props> = ({ title }) => {
  return (
    <>
      <label htmlFor="toggle" className={styles.toggleTitle}>
        {title}
      </label>

      <label className={styles.toggle}>
        <input type="checkbox" id="toggle" className={styles.htmlCheckbox} />
        <span className={styles.slider}></span>
      </label>
    </>
  )
}

export default Toggle

interface Props {
  title: string
}
