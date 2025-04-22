import previousIcon from "../assets/previous.png";
import nextIcon from "../assets/next.png";
import "./Pagination.css";

export default function Pagination({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalCount / pageSize);

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn-icon"
      >
        <img src={previousIcon} alt="previous" />
      </button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn-icon"
      >
        <img src={nextIcon} alt="next" />
      </button>
    </div>
  );
}
