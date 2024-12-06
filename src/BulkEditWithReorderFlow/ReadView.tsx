import { useMemo } from "react";
import { useBulkEditContext } from "./bulkEditContext";
import type { Uuid } from "../models";

export default function ReadView() {
  const { setIsEditing, apiData, hideRow, hiddenOrderIds } =
    useBulkEditContext();

  const hiddenOrderIdsSet = useMemo<Set<Uuid>>(() => {
    return new Set(hiddenOrderIds);
  }, [hiddenOrderIds]);

  return (
    <div>
      <button className="btn" onClick={() => setIsEditing(true)}>
        Edit
      </button>

      <table>
        <thead>
          <tr>
            <th>Sl no.</th>
            <th>Symbol</th>
            <th>Type</th>
            <th>Price</th>
            <th>Date</th>
            <th>Hide</th>
          </tr>
        </thead>
        <tbody>
          {apiData.map((d, idx) => (
            <tr key={d.id}>
              <td>{idx + 1}</td>
              <td>{d.symbol}</td>
              <td>{d.type}</td>
              <td>{d.amount}</td>
              <td>{d.date.toDateString()}</td>
              <td>
                {hiddenOrderIdsSet.has(d.id) ? (
                  "hidden"
                ) : (
                  <button
                    className="icon-btn"
                    onClick={() => hideRow(d.id)}
                    title="hide row"
                    disabled={hiddenOrderIdsSet.has(d.id)}
                  >
                    👀
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
