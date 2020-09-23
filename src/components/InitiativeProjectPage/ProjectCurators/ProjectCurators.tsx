import React, { FC, ChangeEvent, useState } from 'react'
import { curators } from '../../../fixtures'

import styles from './ProjectCurators.module.scss'
import PersonCard from '../../PersonCard/PersonCard'

const ProjectCurators: FC = () => {
  const [term, setTerm] = useState('')

  const onSearchTermChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTerm(event.target.value)
  }

  const renderCurators = (): JSX.Element[] => {
    return curators.map(curator => {
      const { id, image, name } = curator

      return (
        <PersonCard
          key={id}
          type="checkbox"
          id={id}
          path={image}
          name={name}
          subtitle="Факультет информационных технологий"
          onClick={() => console.log('curator')}
        />
      )
    })
  }

  return (
    <div className={styles.curatorsWrapper}>
      <p className={styles.title}>Выбери желаемого куратора проекта.</p>
      <label className={styles.searchLabel}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Поиск"
          value={term}
          onChange={onSearchTermChange}
        />
      </label>
      <ul className={styles.curators}>{renderCurators()}</ul>
    </div>
  )
}

export default ProjectCurators
