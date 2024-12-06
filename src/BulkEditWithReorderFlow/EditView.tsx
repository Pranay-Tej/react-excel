import { NEW_ORDER_PREFIX } from "../constants";
import Excel from "../excel-components/Excel";
import { useExcelContext } from "../excel-components/excelContext";
import type { ApiPayload, LocalOrder, Order } from "../models";

type Props = {
  setData: (data: Order[]) => void;
  setIsEditing: (isEditing: boolean) => void;
};

export default function EditView(props: Props) {
  const onConfirm = (payload: ApiPayload, data: LocalOrder[]) => {
    // call api, get new data
    console.log(payload);

    const newData: Order[] = data.map((d) => ({
      ...d,
      id: d.id.includes(NEW_ORDER_PREFIX) ? crypto.randomUUID() : d.id,
    }));
    props.setData(newData);
    props.setIsEditing(false);
  };

  const { handleSave, isInvalid } = useExcelContext();

  return (
    <div>
      <Excel isSortable />
      <button className="btn" onClick={() => props.setIsEditing(false)}>
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
