import { useExcelContext } from "./excelContext";
import { format } from "date-fns";
import { isInvalidAmount } from "./util";
import { NEW_ORDER_PREFIX } from "./constants";
import SerialNumField from "./SerilaNumField";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import type { OrderType } from "./models";
import clsx from "clsx";
import PageNumber from "./PageNumber";

function Excel() {
  const {
    formattedData,
    isInvalid,
    updatedOrdersIdsSet,
    handleValueChange,
    addNewRow,
    handleCancel,
    handleSave,
    hideRow,
    showAllRows,
    deleteRow,
    highlightedOrderId,
  } = useExcelContext();
  const [isAnimationsEnabled, setIsAnimationsEnabled] = useState(true);
  const [parent, enableAnimations] = useAutoAnimate({
    duration: 600,
  });

  return (
    <div>
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

      <button className="btn" onClick={showAllRows}>
        Clear filters
      </button>

      <hr />
      <table>
        <thead>
          <tr>
            {/* <th>Sl no. (read)</th> */}
            <th>Sl no.</th>
            <th>id</th>
            <th>Type</th>
            <th>Price</th>
            {/* <th>Notes(Optional)</th> */}
            <th>Date</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody ref={parent}>
          {formattedData.map((d) => (
            // <tr key={d.id} className={d.id.includes(NEW_ORDER_PREFIX) ? 'new' : ''}>
            <tr
              key={d.id}
              className={clsx({
                new: d.id.includes(NEW_ORDER_PREFIX),
                edited: updatedOrdersIdsSet.has(d.id),
                highlighted: d.id === highlightedOrderId,
              })}
            >
              {/* <td>{d.position}</td> */}
              <td>
                <SerialNumField currentPosition={d.position} key={d.position} />
              </td>
              <td>{d.id}</td>
              <td>
                <select
                  value={d.type}
                  onChange={(e) =>
                    handleValueChange(
                      { type: e.target.value as OrderType },
                      d.id
                    )
                  }
                >
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  value={d.amount}
                  onChange={(e) =>
                    handleValueChange({ amount: Number(e.target.value) }, d.id)
                  }
                  className={clsx({
                    error: isInvalidAmount(d.amount),
                  })}
                />
              </td>
              {/* <td>
                <input
                  type="text"
                  value={d.notes ?? ""}
                  onChange={(e) =>
                    handleValueChange({ notes: e.target.value }, d.id)
                  }
                  // className={isInvalidNotes(d.notes) ? "error" : ""}
                />
              </td> */}
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
                <button
                  className="delete-btn"
                  onClick={() => hideRow(d.id)}
                  title="hide row"
                >
                  👀
                </button>
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteRow(d.id)}
                  title="delete"
                >
                  ❎
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <PageNumber />
      <hr />

      <button className="btn" onClick={addNewRow}>
        Add New
      </button>
    </div>
  );
}

export default Excel;
