import React, { FC } from 'react'
import classNames from 'classnames'

import styles from './InteractiveButton.module.scss'

const InteractiveButton: FC<Props> = ({
  text,
  icon,
  buttonStyle,
  isActive,
  setIsActive,
}) => {
  const changeColor = () => setIsActive(!isActive)

  const selectClass = () =>
    isActive
      ? classNames(styles[buttonStyle], styles.activeFilters)
      : styles[buttonStyle]

  return (
    <button className={selectClass()} type="button" onClick={changeColor}>
      {icon ? <img className={styles.icon} src={icon} alt={text} /> : text}
    </button>
  )
}

export default InteractiveButton

interface Props {
  buttonStyle: string
  text: string
  icon?: string | undefined
  isActive: boolean
  setIsActive: Function
}
