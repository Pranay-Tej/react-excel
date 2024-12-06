import AddView from "./AddView";
import BulkAddContextProvider from "./BulkAddContextProvider";
import ReadView from "./ReadView";
import { useBulkAddContext } from "./bulkAddContext";
import ExcelContextProvider from "../excel-components/ExcelContextProvider";

export default function BulkAddFlow() {
  return (
    <BulkAddContextProvider>
      <div>
        <h3>Add Flow</h3>
        <hr />
        <br />
        <BulkAdd />
      </div>
    </BulkAddContextProvider>
  );
}

export const BulkAdd = () => {
  const { isEditing, orderData } = useBulkAddContext();

  return (
    <>
      {isEditing ? (
        <ExcelContextProvider initialData={orderData}>
          <AddView />
        </ExcelContextProvider>
      ) : (
        <ReadView />
      )}
    </>
  );
};
