import React, { FC, ReactNode, useState, useEffect } from 'react'

import styles from './Accordion.module.scss'
import arrow from '../../assets/images/select-arrow.svg'

const Accordion: FC<Props> = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false)
  const [display, setDisplay] = useState('none')

  const onAccordionButtonClick = (): void => {
    setIsActive(prevState => !prevState)
  }

  useEffect(() => {
    isActive ? setDisplay('block') : setDisplay('none')
  }, [isActive])

  const renderActiveEnding = (className: string): string => {
    return isActive
      ? `${styles[className]} ${styles[className + 'Active']}`
      : styles[className]
  }

  return (
    <div className={styles.accordion}>
      <button
        className={renderActiveEnding('accordionButton')}
        onClick={onAccordionButtonClick}
      >
        <h3 className={renderActiveEnding('title')}>{title}</h3>
        <img
          src={arrow}
          alt="Развернуть"
          className={renderActiveEnding('arrow')}
        />
      </button>
      <div className={styles.content} style={{ display: `${display}` }}>
        {content}
      </div>
    </div>
  )
}

export default Accordion

interface Props {
  title: string
  content: ReactNode
}
