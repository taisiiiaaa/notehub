import Pagination from "@mui/material/Pagination"

interface PaginationElementProps {
  totalPages: number
  currentPage: number
  updatePage: (page: number) => void
}

const PaginationElement = ({
  totalPages,
  currentPage,
  updatePage,
}: PaginationElementProps) => {
  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={(_, page) => updatePage(page)}
      size="medium"
      sx={{
        display: "flex",
        justifyContent: "center",
        "& .MuiPaginationItem-root": {
          color: "rgba(128, 128, 128, 0.95)",
          borderRadius: "10%",
          transition: "background-color 250ms ease, color 250ms ease",
        },
        "& .MuiPaginationItem-root:hover, & .MuiPaginationItem-root:focus": {
          color: "#000",
          backgroundColor: "rgba(128, 128, 128, 0.25)",
        },
        "& .MuiPaginationItem-root.Mui-selected": {
          color: "#fff",
          backgroundColor: "#0d6efd",
          transition: "background-color 250ms ease, color 250ms ease",
        },
        "& .MuiPaginationItem-root.Mui-selected:hover, .MuiPaginationItem-root.Mui-selected:focus":
          { backgroundColor: "#0b5ed7" },
        "& .MuiPaginationItem-root.Mui-disabled": {
          color: "var(--color-text-muted)",
          opacity: 0.5,
        },
      }}
    />
  )
}

export default PaginationElement
