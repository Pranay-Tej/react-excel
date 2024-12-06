import { NEW_ORDER_PREFIX } from "../constants";
import Excel from "../excel-components/Excel";
import { useExcelContext } from "../excel-components/excelContext";
import type { ApiPayload, LocalOrder, Order } from "../models";
import { useBulkEditContext } from "./bulkEditContext";

export default function EditView() {
  const { setApiData, setIsEditing } = useBulkEditContext();
  const onConfirm = (payload: ApiPayload, data: LocalOrder[]) => {
    // call api, get new data
    console.log(payload);

    const newData: Order[] = data.map((d) => ({
      ...d,
      id: d.id.includes(NEW_ORDER_PREFIX) ? crypto.randomUUID() : d.id,
    }));
    setApiData(newData);
    setIsEditing(false);
  };

  const { handleSave, isInvalid } = useExcelContext();

  return (
    <div>
      <Excel isSortable />
      <button className="btn" onClick={() => setIsEditing(false)}>
        Cancel
      </button>
      <button
        className="btn"
        onClick={() => handleSave(onConfirm)}
        disabled={isInvalid}
      >
        Save
      </button>
    </div>
  );
}
