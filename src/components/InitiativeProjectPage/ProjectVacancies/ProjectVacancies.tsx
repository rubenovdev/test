import React, {
  FC,
  useState,
  useRef,
  ChangeEvent,
  MutableRefObject,
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  createVacancy,
  editVacancy,
  deleteVacancy,
} from '../../../store/vacancies/actions'
import { Vacancy } from '../../../models/store/profile'
import { RootState } from '../../../store/reducers'
import { v4 as uuidv4 } from 'uuid'

import styles from './ProjectVacancies.module.scss'
import Modal from '../../Modal/Modal'
import Button from '../../Button/Button'
import user from '../../../assets/images/transparent-user.svg'
import edit from '../../../assets/images/edit.svg'
import trash from '../../../assets/images/trash.svg'

const ProjectVacancies: FC = () => {
  // Вспомогательные функции для модалок
  const createVacancyModal = useRef() as MutableRefObject<{
    openModal: () => void
    closeModal: () => void
  }>

  const editVacancyModal = useRef() as MutableRefObject<{
    openModal: () => void
    closeModal: () => void
  }>

  const deleteVacancyModal = useRef() as MutableRefObject<{
    openModal: () => void
    closeModal: () => void
  }>

  const openModal = (action: string): void => {
    switch (action) {
      case 'create':
        createVacancyModal.current.openModal()
        break
      case 'edit':
        editVacancyModal.current.openModal()
        break
      case 'delete':
        deleteVacancyModal.current.openModal()
        break
    }
  }

  const closeModal = (action: string): void => {
    switch (action) {
      case 'create':
        createVacancyModal.current.closeModal()
        break
      case 'edit':
        editVacancyModal.current.closeModal()
        break
      case 'delete':
        deleteVacancyModal.current.closeModal()
        break
      default:
        createVacancyModal.current.closeModal()
        editVacancyModal.current.closeModal()
        deleteVacancyModal.current.closeModal()
        break
    }
  }

  const onEscape = (e: React.KeyboardEvent): void => {
    e.which === 27 && closeModal('all')
  }
  // --------------------

  const vacancies: Vacancy[] = useSelector((state: RootState) =>
    Object.values(state.vacancies)
  )

  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState('')

  const [selectedId, setSelectedId] = useState('')
  const [selectedName, setSelectedName] = useState('')
  const [selectedDescription, setSelectedDescription] = useState('')
  const [selectedQuantity, setSelectedQuantity] = useState('')

  const onNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value)
  }

  const onDescriptionChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setDescription(event.target.value)
  }

  const onQuantityChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuantity(event.target.value)
  }

  const onNameEdit = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedName(event.target.value)
  }

  const onDescriptionEdit = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedDescription(event.target.value)
  }

  const onQuantityEdit = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedQuantity(event.target.value)
  }

  const onCreateOrEditVacancyButtonClick = (action: string): void => {
    switch (action) {
      case 'create':
        dispatch(
          createVacancy({
            _id: uuidv4(),
            name,
            description,
            quantity: +quantity,
          })
        )
        setName('')
        setDescription('')
        setQuantity('')
        closeModal('create')
        break
      case 'edit':
        dispatch(
          editVacancy(selectedId, {
            _id: selectedId,
            name: selectedName,
            description: selectedDescription,
            quantity: +selectedQuantity,
          })
        )
        setSelectedId('')
        setSelectedName('')
        setSelectedDescription('')
        setSelectedQuantity('')
        closeModal('edit')
    }
  }

  const onDeleteVacancyButtonClick = (_id: string): void => {
    dispatch(deleteVacancy(_id))
    setSelectedId('')
    setSelectedName('')
    closeModal('delete')
  }

  // Модалка "Добавление вакансии"
  const renderCreateVacancyModalContent = (): JSX.Element => {
    return (
      <form className={styles.modalContent}>
        <input
          className={styles.input}
          type="text"
          placeholder="Название вакансии"
          value={name}
          onChange={onNameChange}
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Описание вакансии"
          value={description}
          onChange={onDescriptionChange}
        />
        <input
          className={styles.input}
          type="number"
          placeholder="Количество человек"
          value={quantity}
          onChange={onQuantityChange}
        />
      </form>
    )
  }

  const renderCreateVacancyModalAction = (): JSX.Element => {
    return (
      <div onClick={() => onCreateOrEditVacancyButtonClick('create')}>
        <Button text="Добавить" buttonStyle="enter" />
      </div>
    )
  }
  // --------------------

  // Модалка "Изменение вакансии"
  const rednerEditVacancyModalContent = (): JSX.Element => {
    return (
      <form className={styles.modalContent}>
        <input
          className={styles.input}
          type="text"
          placeholder={selectedName}
          value={selectedName}
          onChange={onNameEdit}
        />
        <input
          className={styles.input}
          type="text"
          placeholder={selectedDescription}
          value={selectedDescription}
          onChange={onDescriptionEdit}
        />
        <input
          className={styles.input}
          type="number"
          placeholder={`${selectedQuantity} человек`}
          value={selectedQuantity}
          onChange={onQuantityEdit}
        />
      </form>
    )
  }

  const rednerEditVacancyModalAction = (): JSX.Element => {
    return (
      <div onClick={() => onCreateOrEditVacancyButtonClick('edit')}>
        <Button text="Сохранить" buttonStyle="enter" />
      </div>
    )
  }

  // --------------------

  // Модалка "Удаление вакансии"
  const renderDeleteVacancyModalContent = (): JSX.Element => {
    return (
      <p className={styles.warningText}>
        Вы действительно хотите удалить вакансию{' '}
        <span className={styles.vacancyName}>{selectedName}</span>?
      </p>
    )
  }

  const renderDeleteVacancyModalAction = (): JSX.Element => {
    return (
      <div onClick={() => onDeleteVacancyButtonClick(selectedId)}>
        <Button text="Удалить" buttonStyle="enter" />
      </div>
    )
  }
  // --------------------

  const onEditButtonClick = (
    _id: string,
    name: string,
    description: string,
    quantity: number
  ): void => {
    setSelectedId(_id)
    setSelectedName(name)
    setSelectedDescription(description)
    setSelectedQuantity(quantity.toString())
    openModal('edit')
  }

  const onTrashButtonClick = (_id: string, name: string): void => {
    setSelectedId(_id)
    setSelectedName(name)
    openModal('delete')
  }

  const renderVacacies = (): JSX.Element[] | false => {
    return (
      vacancies.length !== 0 &&
      vacancies.map(
        (vacancy: Vacancy): JSX.Element => {
          const { _id, name, description, quantity } = vacancy
          return (
            <li key={_id} className={styles.vacancy}>
              <h3 className={styles.name}>{name}</h3>
              <div className={styles.panel}>
                <div className={styles.quantityWrapper}>
                  <img src={user} alt="Количество вакансий" />
                  <span className={styles.quantity}>{quantity}</span>
                </div>
                <button
                  className={styles.editButton}
                  onClick={() =>
                    onEditButtonClick(_id, name, description, quantity)
                  }
                >
                  <img src={edit} alt="Изменить вакансию" />
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => onTrashButtonClick(_id, name)}
                >
                  <img src={trash} alt="Удалить вакансию" />
                </button>
              </div>
            </li>
          )
        }
      )
    )
  }

  return (
    <div className={styles.vacanciesWrapper}>
      <ul className={styles.vacancies}>{renderVacacies()}</ul>
      <div onClick={() => openModal('create')}>
        <Button text="Добавить" buttonStyle="enter" />
      </div>
      <Modal
        ref={createVacancyModal}
        title="Добавление вакансии"
        content={renderCreateVacancyModalContent()}
        action={renderCreateVacancyModalAction()}
        onEscape={onEscape}
      />
      <Modal
        ref={editVacancyModal}
        title="Редактирование"
        content={rednerEditVacancyModalContent()}
        action={rednerEditVacancyModalAction()}
        onEscape={onEscape}
      />
      <Modal
        ref={deleteVacancyModal}
        title="Удаление вакансии"
        content={renderDeleteVacancyModalContent()}
        action={renderDeleteVacancyModalAction()}
        onEscape={onEscape}
      />
    </div>
  )
}

export default ProjectVacancies
