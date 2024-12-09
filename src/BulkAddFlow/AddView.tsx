import BulkAddExcel from "../excel-components/BulkAddExcel";
import { useExcelContext } from "../excel-components/excelContext";
import { useBulkAddContext } from "./bulkAddContext";

export default function AddView() {
  const {
    setIsEditing,
    isLoading,
    error,
    onConfirm,
    isSimulatingError,
    setIsSimulatingError,
    setError,
  } = useBulkAddContext();

  const { handleBulkAddSave, isInvalid } = useExcelContext();

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <BulkAddExcel />

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
        onClick={() => handleBulkAddSave(onConfirm)}
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
