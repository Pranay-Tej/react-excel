import { useExcelContext } from "./excelContext";

export default function PageNumber() {
  const { page, setPage, totalPages } = useExcelContext();

  return (
    <div
      style={{
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "4px",
      }}
    >
      <button
        className="btn"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>
      <span>{page}</span>
      <button
        className="btn"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
