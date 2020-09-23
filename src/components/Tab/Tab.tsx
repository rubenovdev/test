import React, { FC } from 'react'
import classNames from 'classnames'

import styles from './Tab.module.scss'

interface Props {
  activeTab: string
  tabName: string
  onTabClick: (tabName: string) => void
  tabsStyle: string | undefined
}

const Tab: FC<Props> = ({ activeTab, tabName, onTabClick, tabsStyle }) => {
  const tabClass = classNames(
    styles[tabsStyle + 'Tab'],
    activeTab === tabName && styles[tabsStyle + 'TabActive']
  )

  return (
    <li className={tabClass} onClick={(): void => onTabClick(tabName)}>
      {tabName}
    </li>
  )
}

export default Tab
