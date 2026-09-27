import { createPortal } from "react-dom"
import styles from "./Modal.module.css"
import { useEffect } from "react"

interface ModalProps {
  children: React.ReactNode
  onClose: () => void
}

const Modal = ({ children, onClose }: ModalProps) => {
  const modalRoot = document.getElementById("modal-root")

  useEffect(() => {
    const originalOverflow = document.body.style.overflow

    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose])

  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!modalRoot) {
    return null
  }

  return createPortal(
    <div
      onClick={handleCloseModal}
      className={styles.backdrop}
      role="dialog"
      aria-modal="true">
      <div className={styles.modal}>{children}</div>
    </div>,
    modalRoot,
  )
}

export default Modal
