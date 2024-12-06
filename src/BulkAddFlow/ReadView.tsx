import { useBulkAddContext } from "./bulkAddContext";

export default function ReadView() {
  const { handleAddOrders, orderData } = useBulkAddContext();

  return (
    <div>
      <button className="btn" onClick={handleAddOrders}>
        Add
      </button>

      <table>
        <thead>
          <tr>
            <th>Sl no.</th>
            <th>Symbol</th>
            <th>Type</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((d, idx) => (
            <tr key={d.id}>
              <td>{idx + 1}</td>
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
