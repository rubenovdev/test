import React, {
  FC,
  Ref,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { createPortal } from 'react-dom'

import CloseButton from '../CloseButton/CloseButton'
import styles from './Modal.module.scss'

const Modal: FC<Props> = forwardRef(
  ({ title, content, action, onEscape }: Props, ref: Ref<unknown>) => {
    const [isDisplay, setIsDisplay] = useState<boolean>(false)

    const openModal = (): void => {
      setIsDisplay(true)
    }

    const closeModal = (): void => {
      setIsDisplay(false)
    }

    useImperativeHandle(ref, (): {
      openModal: () => void
      closeModal: () => void
    } => ({ openModal, closeModal }))

    return (
      <>
        {isDisplay &&
          createPortal(
            <div
              className={styles.modalWrapper}
              tabIndex={0}
              onKeyDown={onEscape}
            >
              <div onClick={closeModal} className={styles.modalBackdrop} />
              <div className={styles.modalBox}>
                <button
                  type="button"
                  onClick={closeModal}
                  className={styles.closeButton}
                >
                  <CloseButton />
                </button>
                <div className={styles.mainContent}>
                  <h2 className={styles.modalTitle}>{title}</h2>
                  <div className={styles.modalForm}>
                    {content}
                    {action}
                  </div>
                </div>
              </div>
            </div>,
            document.querySelector('#modal-root') as HTMLElement
          )}
      </>
    )
  }
)

export default Modal

interface Props {
  title: string
  content: JSX.Element
  action: JSX.Element
  onEscape: (e: React.KeyboardEvent) => void
  ref: React.Ref<unknown>
}
