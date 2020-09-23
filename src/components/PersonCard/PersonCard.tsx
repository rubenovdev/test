import React, { FC, useState, useEffect } from 'react'
import classNames from 'classnames'

import styles from './PersonCard.module.scss'

const PersonCard: FC<Props> = ({
  type,
  id,
  path,
  name,
  subtitle,
  onClick,
  currIndex,
  icon,
  onIconClick,
}) => {
  const [isActive, setIsActive] = useState(false)

  const onCardClick = (): void => {
    type === 'radio' ? onClick(id, path, name, subtitle) : onClick()
    type === 'checkbox' && setIsActive(prevState => !prevState)
  }

  useEffect(() => {
    setIsActive(currIndex === id ? true : false)
  }, [currIndex, id])

  const renderClassName = (className: string): string => {
    return classNames(
      styles[className],
      (isActive || type === 'static') && styles[`${className}Active`]
    )
  }

  const renderIcon = (): JSX.Element | undefined => {
    if (icon)
      return (
        <img
          src={icon}
          alt="Удалить"
          className={styles.icon}
          onClick={onIconClick}
        />
      )
  }

  return (
    <li className={renderClassName('card')} onClick={onCardClick}>
      <img src={path} alt="Куратор" className={styles.image} />
      <div className={styles.info}>
        <p className={renderClassName('name')}>{name}</p>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      {renderIcon()}
    </li>
  )
}

interface Props {
  type: string
  id: number
  path: string
  name: string
  subtitle: string
  onClick?: any
  currIndex?: number
  icon?: string
  onIconClick?: () => void
}

export default PersonCard
