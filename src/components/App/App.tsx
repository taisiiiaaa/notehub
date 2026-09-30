import { useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { fetchNotes } from "../../services/noteService"
import Pagination from "../Pagination/Pagination"
import SearchBox from "../SearchBox/SearchBox"
import styles from "./App.module.css"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import NoteList from "../NoteList/NoteList"
import Loader from "../Loader/Loader"
import Modal from "../Modal/Modal"
import NoteForm from "../NoteForm/NoteForm"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import EmptyState from "../EmptyState/EmptyState"

const App = () => {
  const [searchInput, setSearchInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }, 300)

  const { data, isSuccess, isLoading, error, isError, isFetching } = useQuery({
    queryKey: ["notes", searchQuery, currentPage],
    queryFn: () => fetchNotes(currentPage, searchQuery),
    placeholderData: keepPreviousData,
  })

  const handleSearchChange = (value: string) => {
    setSearchInput(value)
    debouncedSearch(value)
  }

  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        <SearchBox value={searchInput} onChange={handleSearchChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            updatePage={setCurrentPage}
          />
        )}
        <button
          onClick={() => setIsModalVisible(true)}
          className={styles.button}>
          Create note +
        </button>
      </header>
      <main>
        {isLoading && !isError && <Loader />}

        {isSuccess && data.notes.length > 0 && (
          <div className={styles.notesContainer}>
            <NoteList notes={data.notes} />

            {isFetching && !isLoading && <Loader variant="fetching" />}
          </div>
        )}

        {isError && (
          <ErrorMessage
            message={
              error instanceof Error ? error.message : "Failed to load notes."
            }
          />
        )}

        {isSuccess && data.notes.length === 0 && (
          <EmptyState searchQuery={searchQuery} />
        )}

        {isModalVisible && (
          <Modal onClose={() => setIsModalVisible(false)}>
            <NoteForm onClose={() => setIsModalVisible(false)} />
          </Modal>
        )}
      </main>
    </div>
  )
}

export default App
