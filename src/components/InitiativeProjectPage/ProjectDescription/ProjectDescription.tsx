import React, { FC, useState, FormEvent, ChangeEvent } from 'react'
import classNames from 'classnames'

import styles from './ProjectDescription.module.scss'

const ProjectDescription: FC = () => {
  const [errors, setErrors] = useState({
    nameError: '',
  })
  const [name, setName] = useState('')

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault()
  }

  const onNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value)
    setErrors({
      ...errors,
      nameError:
        name.length < 6 ? 'Поле должно содержать не менее 6 символов' : '',
    })
  }

  const renderInputGroupClassName = (): string => {
    return classNames(
      styles.inputGroup,
      errors.nameError && styles.inputGroupOnError
    )
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={renderInputGroupClassName()}>
        <input
          type="text"
          value={name}
          placeholder="Названия"
          className={styles.name}
          onChange={onNameChange}
        />
        <span className={styles.error}>
          {errors.nameError && errors.nameError}
        </span>
      </label>
      <textarea
        placeholder="Описание"
        className={styles.description}
      ></textarea>
    </form>
  )
}

export default ProjectDescription
