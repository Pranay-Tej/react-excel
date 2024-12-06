import Excel from "../excel-components/Excel";
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
  } = useBulkEditContext();

  const { handleSave, isInvalid } = useExcelContext();

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Excel isSortable />

      {error && (
        <p
          style={{
            color: "red",
          }}
        >
          {error}
        </p>
      )}

      <button className="btn" onClick={() => setIsEditing(false)}>
        Cancel
      </button>
      <button
        className="btn"
        onClick={() => handleSave(onConfirm)}
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
