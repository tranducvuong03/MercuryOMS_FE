interface PaginationProps {
  currentPage: number
  totalPages: number
  onChange: (page: number) => void
  showPageNumbers?: boolean
  label?: string
}

const Pagination = ({
  currentPage,
  totalPages,
  onChange,
  showPageNumbers = false,
  label = `Trang ${currentPage} / ${totalPages}`
}: PaginationProps) => {
  if (totalPages <= 1) return null

  return (
    <>
      <div className={`pagination ${showPageNumbers ? "pagination-full" : "pagination-compact"}`}>
        <button
          className="page-btn prev-btn"
          onClick={() => onChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          ← Trước
        </button>

        {showPageNumbers && (
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`page-number ${currentPage === page ? "active" : ""}`}
                onClick={() => onChange(page)}
              >
                {page}
              </button>
            ))}
          </div>
        )}

        <span className="pagination-info">{label}</span>

        <button
          className="page-btn next-btn"
          onClick={() => onChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          Tiếp →
        </button>
      </div>
    </>
  )
}

export default Pagination
