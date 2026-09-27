import styles from "./ErrorMessage.module.css"

interface ErrorMessageProps {
  message: string
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className={styles.container}>
      <h2>Something went wrong</h2>
      <p>{message}</p>
    </div>
  )
}

export default ErrorMessage
