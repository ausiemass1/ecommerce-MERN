interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  
  const Pagination: React.FC<Props> = ({
    currentPage,
    totalPages,
    onPageChange,
  }) => {
    if (totalPages <= 1) return null;
  
    return (
      <ul className="pagination center">
        <li className={currentPage === 1 ? "disabled" : ""}>
          <button
            className="btn-flat"
            onClick={() => onPageChange(currentPage - 1)}
          >
            ‹
          </button>
        </li>
  
        {Array.from({ length: totalPages }).map((_, i) => (
          <li
            key={i}
            className={currentPage === i + 1 ? "active" : ""}
          >
            <button
              className="btn-flat"
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </button>
          </li>
        ))}
  
        <li className={currentPage === totalPages ? "disabled" : ""}>
          <button
            className="btn-flat"
            onClick={() => onPageChange(currentPage + 1)}
          >
            ›
          </button>
        </li>
      </ul>
    );
  };
  
  export default Pagination;
  