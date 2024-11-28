import { useExcelContext } from "./excelContext";
import { format } from "date-fns";
import { isInvalidAmount, isInvalidNotes } from "./util";
import { NEW_ORDER_PREFIX } from "./constants";
import SerialNumField from "./SerilaNumField";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";

function Excel() {
  const {
    data,
    isInvalid,
    handleValueChange,
    addNewRow,
    handleCancel,
    handleSave,
    deleteRow,
  } = useExcelContext();
  const [isAnimationsEnabled, setIsAnimationsEnabled] = useState(true);
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);

  return (
    <div>
      <h1>Excel</h1>

      <div>
        <button
          className="btn"
          onClick={() => {
            enableAnimations(!isAnimationsEnabled);
            setIsAnimationsEnabled((curr) => !curr);
          }}
        >
          {isAnimationsEnabled ? "Disable Animations" : "Enable Animations"}
        </button>
      </div>
      <hr />

      <button className="btn" onClick={handleCancel}>
        Cancel
      </button>
      <button className="btn" onClick={handleSave} disabled={isInvalid}>
        Save
      </button>

      <hr />
      <table>
        <thead>
          <tr>
            <th>S No.</th>
            <th>id</th>
            <th>amount</th>
            <th>notes</th>
            <th>date</th>
            <th></th>
          </tr>
        </thead>
        <tbody ref={parent}>
          {data.map((d, idx) => (
            // <tr key={d.id} className={d.id.includes(NEW_ORDER_PREFIX) ? 'new' : ''}>
            <tr
              key={`${d.id}-${idx}`}
              className={d.id.includes(NEW_ORDER_PREFIX) ? "new" : ""}
            >
              <td>
                <SerialNumField currentIndex={idx} />
              </td>
              <td>{d.id}</td>
              <td>
                <input
                  type="number"
                  value={d.amount}
                  onChange={(e) =>
                    handleValueChange({ amount: Number(e.target.value) }, d.id)
                  }
                  className={isInvalidAmount(d.amount) ? "error" : ""}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={d.notes}
                  onChange={(e) =>
                    handleValueChange({ notes: e.target.value }, d.id)
                  }
                  className={isInvalidNotes(d.notes) ? "error" : ""}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={format(d.date, "yyyy-MM-dd")}
                  onChange={(e) =>
                    handleValueChange({ date: new Date(e.target.value) }, d.id)
                  }
                />
              </td>
              <td>
                <button className="delete-btn" onClick={() => deleteRow(d.id)}>
                  ❎
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn" onClick={addNewRow}>
        Add New
      </button>
    </div>
  );
}

export default Excel;
