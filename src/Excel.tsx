import { useExcelContext } from "./excelContext";
import { format } from "date-fns";
import { isInvalidAmount, isInvalidNotes } from "./util";

function Excel() {
  const {
    data,
    isInvalid,
    handleValueChange,
    addNewRow,
    handleCancel,
    handleSave,
  } = useExcelContext();

  return (
    <div>
      <h1>Excel</h1>

      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleSave} disabled={isInvalid}>
        Save
      </button>

      <hr />
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>amount</th>
            <th>notes</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.id}>
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
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={addNewRow}>Add New</button>
    </div>
  );
}

export default Excel;
