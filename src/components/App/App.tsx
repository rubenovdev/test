import React, { useRef, FC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from '../../store'
import styles from './App.module.scss'
import Modal from '../Modal/Modal'
import Header from '../Header/Header'
import Homepage from '../Homepage/Homepage'
import AnnouncementsPage from '../AnnouncementsPage/AnnouncementsPage'
import ProjectSearch from '../ProjectSearch/ProjectSearch'
import ProjectPage from '../ProjectPage/ProjectPage'
import InitiativeProjectPage from '../InitiativeProjectPage/InitiativeProjectPage'
import Wrapper from '../Wrapper/Wrapper'
import Button from '../Button/Button'

const App: FC = () => {
  const modalRef = useRef() as React.MutableRefObject<{
    openModal: () => void
    closeModal: () => void
  }>

  // const openModal = (): void => { // закомментил, тк неигда не используется
  //   modalRef.current.openModal()
  // }

  const closeModal = (): void => {
    modalRef.current.closeModal()
  }

  const renderModalContent = (): JSX.Element => {
    return (
      <form className={styles.modalContent}>
        <input
          className={styles.formTitle}
          type="text"
          placeholder="Заголовок объявления"
        />
        <textarea
          className={styles.formText}
          placeholder="Текст объявления"
        ></textarea>
      </form>
    )
  }

  const renderAction = (): JSX.Element => {
    return (
      <button className={styles.addButton} type="button" onClick={closeModal}>
        <Button text="Добавить" buttonStyle="enter" />
      </button>
    )
  }

  const onEscape = (e: React.KeyboardEvent): void => {
    e.which === 27 && closeModal()
  }

  return (
    <Provider store={store}>
      <div onKeyDown={onEscape}>
        <Router>
          <Header />
          <Wrapper>
            {/* <button type="button" onClick={openModal}>
              Добавить
            </button> */}
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route path="/announcements" component={AnnouncementsPage} />
              <Route exact path="/projects-search" component={ProjectSearch} />
              <Route path="/project" component={ProjectPage} />
              <Route
                path="/initiative-project"
                component={InitiativeProjectPage}
              />
            </Switch>
            <Modal
              ref={modalRef}
              title="Добавление объявления"
              content={renderModalContent()}
              action={renderAction()}
              onEscape={onEscape}
            />
          </Wrapper>
        </Router>
      </div>
    </Provider>
  )
}

export default App
