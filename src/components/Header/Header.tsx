import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'

import logo from '../../assets/images/logo.svg'
import styles from './Header.module.scss'

const Header: FC = () => {
  return (
    <header>
      <h1 className="visually-hidden">
        Подбор студенческих команд в Московском политехе
      </h1>
      <div className={styles.wrapper}>
        <div className={styles.sitetoolbar}>
          <button type="button">
            <span className={styles.line}></span>
          </button>
        </div>
        <div className={styles.logoWrapper}>
          <NavLink to="/">
            <img className={styles.logo} src={logo} alt="Московский Политех" />
          </NavLink>
        </div>
      </div>
    </header>
  )
}

export default Header
