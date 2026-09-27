import styles from "./EmptyState.module.css"

interface EmptyStateProps {
  searchQuery: string
}

const EmptyState = ({ searchQuery }: EmptyStateProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>No notes found</h2>

      {searchQuery ? (
        <p className={styles.text}>No notes match "{searchQuery}".</p>
      ) : (
        <p className={styles.text}>You don't have any notes yet.</p>
      )}
    </div>
  )
}

export default EmptyState
