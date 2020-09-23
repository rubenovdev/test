import React, { FC, useState } from 'react'

import CustomCheckbox from '../CustomCheckbox/CustomCheckbox'
import styles from './ProjectSearchFilterItems.module.scss'

const ProjectSearchFilterItems: FC<Props> = ({ items }) => {
  const preview = items.length > 5 ? items.slice(0, 5) : []

  const [isFull, setIsFull] = useState(false)

  const showCheckboxes = () =>
    (isFull || preview.length === 0 ? items : preview).map((item, index) => (
      <CustomCheckbox key={index} text={item} /> // TODO: заменить key
    ))

  const buttonName = () => (isFull ? 'Скрыть' : 'Показать еще')

  return (
    <div className={styles.items}>
      {showCheckboxes()}
      {preview.length !== 0 && (
        <button
          className={styles.allFiltersButton}
          onClick={() => setIsFull(prevState => !prevState)}
        >
          {buttonName()}
        </button>
      )}
    </div>
  )
}

export default ProjectSearchFilterItems

interface Props {
  items: Array<string>
}
