import type { CreateNote } from "../../types/note"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import styles from "./NoteForm.module.css"

interface NoteFormProps {
  onClose: () => void
  onSubmit: (note: CreateNote) => void
  isSubmitting?: boolean
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

const NoteForm = ({
  onClose,
  onSubmit,
  isSubmitting = false,
}: NoteFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
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
            disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create note"}
          </button>
        </div>
      </Form>
    </Formik>
  )
}

export default NoteForm
