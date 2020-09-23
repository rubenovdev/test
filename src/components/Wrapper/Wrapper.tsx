import React, { FC, ReactNode } from 'react'

import styles from './Wrapper.module.scss'

const Wrapper: FC<Props> = ({ children }) => {
  return (
    <main role="main">
      <div className={styles.wrapper}>{children}</div>
    </main>
  )
}

export default Wrapper

interface Props {
  children: ReactNode
}
