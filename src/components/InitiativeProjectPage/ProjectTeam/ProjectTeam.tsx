import React, {
  FC,
  useState,
  useRef,
  MutableRefObject,
  ChangeEvent,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createMember } from '../../../store/members/actions'
import { Member } from '../../../store/members/types'
import { curators } from '../../../fixtures'
import { RootState } from '../../../store/reducers'
import { v4 as uuidv4 } from 'uuid'

import styles from './ProjectTeam.module.scss'
import Modal from '../../Modal/Modal'
import Button from '../../Button/Button'
import PersonCard from '../../PersonCard/PersonCard'
import trash from '../../../assets/images/trash.svg'

const ProjectTeam: FC = () => {
  // Вспомогательные функции для модалок
  const createMemberModal = useRef() as MutableRefObject<{
    openModal: () => void
    closeModal: () => void
  }>

  const deleteMemberModal = useRef() as MutableRefObject<{
    openModal: () => void
    closeModal: () => void
  }>

  const openModal = (action: string): void => {
    switch (action) {
      case 'create':
        createMemberModal.current.openModal()
        break
      case 'delete':
        deleteMemberModal.current.openModal()
        break
    }
  }

  const closeModal = (action: string): void => {
    switch (action) {
      case 'create':
        createMemberModal.current.closeModal()
        break
      case 'delete':
        deleteMemberModal.current.closeModal()
        break
      default:
        createMemberModal.current.closeModal()
        deleteMemberModal.current.closeModal()
        break
    }
  }

  const onEscape = (e: React.KeyboardEvent): void => {
    e.which === 27 && closeModal('all')
  }
  // --------------------

  const members: Member[] = useSelector((state: RootState) =>
    Object.values(state.members)
  )

  const dispatch = useDispatch()

  const [vacancyName, setVacancyName] = useState('')
  const [currentMember, setCurrentMember] = useState<{
    id: number
    path: string | undefined
    name: string | undefined
    subtitle: string | undefined
  }>({
    id: -1,
    path: '',
    name: '',
    subtitle: '',
  })

  const onVacancyNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setVacancyName(event.target.value)
  }

  const onMemeberClick = (
    id: number,
    path?: string,
    name?: string,
    subtitle?: string
  ): void => {
    setCurrentMember({ id, path, name, subtitle })
  }

  const onCreateMemberButtonClick = (): void => {
    closeModal('create')
    const { path, name } = currentMember
    if (path && name) {
      dispatch(
        createMember({
          _id: uuidv4(),
          path,
          name,
          vacancy: vacancyName,
        })
      )
    }
  }

  // Модалка "Добавление участника"
  const renderCreateMemberModalContent = (): JSX.Element => {
    return (
      <form className={styles.modalContent}>
        <input
          className={styles.input}
          type="text"
          placeholder="Название вакансии"
          value={vacancyName}
          onChange={onVacancyNameChange}
        />
        <label className={styles.searchLabel}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Поиск"
          />
        </label>
        {curators.map(curator => {
          const { id, image, name } = curator

          return (
            <PersonCard
              key={id}
              type="radio"
              id={id}
              path={image}
              name={name}
              subtitle="181-322"
              onClick={onMemeberClick}
              currIndex={currentMember.id}
            />
          )
        })}
      </form>
    )
  }

  const renderCreateMemberModalAction = (): JSX.Element => {
    return (
      <div onClick={onCreateMemberButtonClick}>
        <Button text="Добавить" buttonStyle="enter" />
      </div>
    )
  }
  //--------------------

  // Модалка "Удаление участника"
  const renderDeleteMemberModalContent = (): JSX.Element => {
    return (
      <p className={styles.warningText}>
        Вы действительно хотите удалить участника{' '}
        <span className={styles.memberName}>Марина Даньшина</span>?
      </p>
    )
  }

  const renderDeleteMemberModalAction = (): JSX.Element => {
    return (
      <div>
        <Button text="Удалить" buttonStyle="enter" />
      </div>
    )
  }
  //--------------------

  const renderMembers = (): JSX.Element[] => {
    return members.map(member => {
      const { _id, path, name, vacancy } = member
      return (
        <PersonCard
          key={_id}
          type="static"
          id={+_id}
          path={path}
          name={name}
          subtitle={vacancy}
          onClick={() => console.log('static')}
          icon={trash}
          onIconClick={() => openModal('delete')}
        />
      )
    })
  }

  return (
    <div className={styles.teamWrapper}>
      {members.length !== 0 && (
        <ul className={styles.members}>{renderMembers()}</ul>
      )}
      <div onClick={() => openModal('create')}>
        <Button text="Добавить" buttonStyle="enter" />
      </div>
      <Modal
        ref={createMemberModal}
        title="Добавление участника"
        content={renderCreateMemberModalContent()}
        action={renderCreateMemberModalAction()}
        onEscape={onEscape}
      />
      <Modal
        ref={deleteMemberModal}
        title="Удаление участника"
        content={renderDeleteMemberModalContent()}
        action={renderDeleteMemberModalAction()}
        onEscape={onEscape}
      />
    </div>
  )
}

export default ProjectTeam
