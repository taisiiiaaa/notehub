import type { CreateNote } from "../../types/note"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import styles from "./NoteForm.module.css"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { createNote } from "../../services/noteService"

interface NoteFormProps {
  onClose: () => void
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title could not exceed 50 characters")
    .required("Title is required"),

  content: Yup.string().max(500, "Content could not exceed 500 characters"),

  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
    .required("Tag is required"),
})

const initialValues: CreateNote = { title: "", content: "", tag: "Todo" }

const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient()

  const createNoteMutation = useMutation({
    mutationFn: createNote,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] })

      onClose()
      toast.success("Note created successfully!")
    },

    onError: () => {
      toast.error("Failed to create note.")
    },
  })

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(note: CreateNote) => createNoteMutation.mutate(note)}>
      <Form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>

          <Field id="title" type="text" name="title" className={styles.input} />

          <ErrorMessage
            name="title"
            component="span"
            className={styles.error}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="content">Content</label>

          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={styles.textarea}
          />

          <ErrorMessage
            name="content"
            component="span"
            className={styles.error}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="tag">Tag</label>

          <Field as="select" id="tag" name="tag" className={styles.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>

          <ErrorMessage name="tag" component="span" className={styles.error} />
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}>
            Cancel
          </button>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={createNoteMutation.isPending}>
            {createNoteMutation.isPending ? "Creating..." : "Create note"}
          </button>
        </div>
      </Form>
    </Formik>
  )
}

export default NoteForm
