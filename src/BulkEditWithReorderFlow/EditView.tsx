import BulkEditExcel from "../excel-components/BulkEditExcel";
import { useExcelContext } from "../excel-components/excelContext";
import { useBulkEditContext } from "./bulkEditContext";

export default function EditView() {
  const {
    setIsEditing,
    isLoading,
    error,
    onConfirm,
    isSimulatingError,
    setIsSimulatingError,
    setError,
  } = useBulkEditContext();

  const { handleBulkEditSave, isInvalid, addNewRow } = useExcelContext();

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <button className="btn" onClick={addNewRow}>
        Add New
      </button>

      <BulkEditExcel isSortable />

      {error && (
        <p
          style={{
            color: "red",
          }}
        >
          {error}
        </p>
      )}

      <button
        className="btn"
        onClick={() => {
          setError(null);
          setIsEditing(false);
        }}
      >
        Cancel
      </button>
      <button
        className="btn"
        onClick={() => handleBulkEditSave(onConfirm)}
        disabled={isInvalid || isLoading}
      >
        Save
      </button>

      <label
        htmlFor="simulate-error"
        style={{
          display: "inline-flex",
          gap: "4px",
          cursor: "pointer",
        }}
      >
        <input
          id="simulate-error"
          type="checkbox"
          checked={isSimulatingError}
          onChange={(e) => {
            setIsSimulatingError(e.target.checked);
          }}
        />
        Simulate Error
      </label>

      {isLoading && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "hsla(0, 0%, 50%, 70%)",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            display: "grid",
            placeItems: "center",
          }}
        >
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}
