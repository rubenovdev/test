import React, { FC, useState, useMemo } from 'react'
import classNames from 'classnames'

import styles from './CustomSelect.module.scss'
import arrow from '../../assets/images/select-arrow.svg'

const CustomSelect: FC<Props> = ({
  title,
  list,
  selectedItem,
  selectStyle,
}) => {
  const [listOpen, setListOpen] = useState<boolean>(false)
  const [headerTitle, setHeaderTitle] = useState<string>(title)
  const optionList = useMemo(
    (): Array<string> => list.filter(item => item !== headerTitle),
    [headerTitle, list]
  )

  const toggleList = (): void => {
    setListOpen(!listOpen)
  }

  return (
    <label className={classNames(styles.selectWrapper, styles[selectStyle])}>
      <div
        className={
          listOpen
            ? classNames(styles.selectHeader, styles.selectHeaderOpen)
            : styles.selectHeader
        }
        onClick={(): void => toggleList()}
      >
        <div className={styles.selectHeaderTitle}>{headerTitle}</div>
        {listOpen ? (
          <div className={styles.arrow}>
            <img
              style={{ transform: 'rotate(180deg)' }}
              src={arrow}
              alt="Свернуть"
            />
          </div>
        ) : (
          <div className={styles.arrow}>
            <img src={arrow} alt="Развернуть" />
          </div>
        )}
      </div>
      {listOpen && (
        <ul className={styles.selectList}>
          {optionList.map((item, index) => (
            <li
              key={index}
              className={styles.selectListItem}
              onClick={(): void => {
                setHeaderTitle(item)
                selectedItem(item)
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </label>
  )
}

export default CustomSelect

interface Props {
  title: string
  list: Array<string>
  selectStyle: string
  selectedItem(title: string): void
}
