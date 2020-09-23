import React, { FC, useState } from 'react'

import styles from './Tabs.module.scss'
import Tab from '../Tab/Tab'

const Tabs: FC<Props> = ({ children, tabsStyle }) => {
  const [activeTab, setActiveTab] = useState<string>(
    children[0].props['data-tabname']
  )

  const onTabClick = (tabName: string): void => {
    setActiveTab(tabName)
  }

  const renderTabsItems = (): JSX.Element[] => {
    return children.map(child => {
      const tabName = child.props['data-tabname']

      return (
        <Tab
          key={tabName}
          activeTab={activeTab}
          tabName={tabName}
          onTabClick={onTabClick}
          tabsStyle={tabsStyle}
        />
      )
    })
  }

  const renderTabContent = (): (JSX.Element | false)[] => {
    return children.map(child => {
      return child.props['data-tabname'] === activeTab && child
    })
  }

  return (
    <div className={styles[tabsStyle + 'Tabs']}>
      <ul className={styles[tabsStyle + 'TabsList']}>{renderTabsItems()}</ul>
      <div className={styles[tabsStyle + 'TabContent']}>
        {renderTabContent()}
      </div>
    </div>
  )
}

export default Tabs

interface Props {
  children: JSX.Element[]
  tabsStyle?: string
}
