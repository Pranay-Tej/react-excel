import { useState } from "react";
import { initialData } from "../constants";
import ExcelContextProvider from "../excel-components/ExcelContextProvider";
import EditView from "./EditView";
import ReadView from "./ReadView";

export default function BulkEditWithReorderFlow() {
  const [isEditing, setIsEditing] = useState(false);
  const [apiData, setApiData] = useState(initialData);

  return (
    <div>
      <h3>Edit Flow</h3>
      {isEditing ? (
        <ExcelContextProvider initialData={apiData}>
          <EditView setData={setApiData} setIsEditing={setIsEditing} />
        </ExcelContextProvider>
      ) : (
        <ReadView data={apiData} setIsEditing={setIsEditing} />
      )}
    </div>
  );
}
