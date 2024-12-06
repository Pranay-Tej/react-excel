import EditView from "./EditView";
import BulkEditContextProvider from "./BulkEditContextProvider";
import ReadView from "./ReadView";
import { useBulkEditContext } from "./bulkEditContext";
import ExcelContextProvider from "../excel-components/ExcelContextProvider";

export default function BulkEditWithReorderFlow() {
  return (
    <BulkEditContextProvider>
      <div>
        <h3>Edit Flow</h3>
        <BulkEditor />
      </div>
    </BulkEditContextProvider>
  );
}

export const BulkEditor = () => {
  const { isEditing, apiData } = useBulkEditContext();

  return isEditing ? (
    <ExcelContextProvider initialData={apiData}>
      <EditView />
    </ExcelContextProvider>
  ) : (
    <ReadView />
  );
};
