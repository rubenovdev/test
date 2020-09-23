import React from 'react'
import styles from './Button.module.scss'

const Button = ({
  text,
  icon = undefined,
  buttonStyle,
}: Props): JSX.Element => {
  return (
    <button className={styles[buttonStyle]} type="button">
      {icon ? <img className={styles.icon} src={icon} alt={text} /> : text}
    </button>
  )
}

export default Button

interface Props {
  buttonStyle: string
  text: string
  icon?: string | undefined
}
