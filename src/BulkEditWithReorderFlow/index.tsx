import EditView from "./EditView";
import BulkEditContextProvider from "./BulkEditContextProvider";
import ReadView from "./ReadView";
import { useBulkEditContext } from "./bulkEditContext";
import ExcelContextProvider from "../excel-components/ExcelContextProvider";
import { useMemo } from "react";

export default function BulkEditWithReorderFlow() {
  return (
    <BulkEditContextProvider>
      <div>
        <h3>Edit Flow</h3>
        <hr />
        <br />
        <BulkEditor />
      </div>
    </BulkEditContextProvider>
  );
}

export const BulkEditor = () => {
  const {
    isEditing,
    apiData,
    hiddenOrderIds,
    clearFilters,
  } = useBulkEditContext();

  const hiddenSymbols = useMemo(() => {
    return apiData
      .filter((d) => hiddenOrderIds.includes(d.id))
      .map((d) => d.symbol);
  }, [apiData, hiddenOrderIds]);

  return (
    <>
      {hiddenOrderIds.length > 0 && (
        <>
          <p>{hiddenOrderIds.length} item(s) hidden</p>
          <p>{hiddenSymbols.toString()}</p>
          <button className="btn" onClick={clearFilters}>
            Clear All Filters
          </button>
        </>
      )}
      {isEditing ? (
        <ExcelContextProvider
          initialData={apiData}
          hiddenOrderIds={hiddenOrderIds}
        >
          <EditView />
        </ExcelContextProvider>
      ) : (
        <ReadView />
      )}
    </>
  );
};
