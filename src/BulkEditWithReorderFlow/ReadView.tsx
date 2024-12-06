import { useBulkEditContext } from "./bulkEditContext";

export default function ReadView() {
  const { setIsEditing, apiData } = useBulkEditContext();
  return (
    <div>
      <button className="btn" onClick={() => setIsEditing(true)}>
        Edit
      </button>

      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Type</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {apiData.map((d) => (
            <tr key={d.id}>
              <td>{d.symbol}</td>
              <td>{d.type}</td>
              <td>{d.amount}</td>
              <td>{d.date.toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
