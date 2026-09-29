import type { ComponentType } from "react"
import ReactPaginateModule from "react-paginate"
import type { ReactPaginateProps } from "react-paginate"
import styles from "./Pagination.module.css"

type ModuleWithDefault<T> = { default: T }

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default

interface PaginationProps {
  totalPages: number
  currentPage: number
  updatePage: (page: number) => void
}

const Pagination = ({
  totalPages,
  currentPage,
  updatePage,
}: PaginationProps) => {
  return (
    <ReactPaginate
      pageCount={totalPages}
      onPageChange={({ selected }) => {
        updatePage(selected + 1)
      }}
      forcePage={currentPage - 1}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      containerClassName={styles.pagination}
      pageClassName={styles.page}
      pageLinkClassName={styles.pageLink}
      activeClassName={styles.active}
      previousClassName={styles.previous}
      nextClassName={styles.next}
      disabledClassName={styles.disabled}
      breakClassName={styles.break}
    />
  )
}

export default Pagination
