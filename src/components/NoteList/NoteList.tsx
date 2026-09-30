import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Note } from "../../types/note"
import styles from "./NoteList.module.css"
import { deleteNote } from "../../services/noteService"
import toast from "react-hot-toast"

interface NoteListProps {
  notes: Note[]
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient()

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] })

      toast.success("Note deleted successfully!")
    },

    onError: () => {
      toast.error("Failed to delete note.")
    },
  })

  return (
    <ul className={styles.list}>
      {notes.map((note) => (
        <li key={note.id} className={styles.listItem}>
          <h2 className={styles.title}>{note.title}</h2>
          <p className={styles.content}>{note.content}</p>
          <div className={styles.footer}>
            <span className={styles.tag}>{note.tag}</span>
            <button
              onClick={() => deleteNoteMutation.mutate(note.id)}
              className={styles.button}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default NoteList
