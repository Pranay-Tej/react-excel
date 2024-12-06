import type { Order } from "../models";

type Props = {
  data: Order[];
  setIsEditing: (isEditing: boolean) => void;
};

export default function ReadView(props: Props) {
  return (
    <div>
      <button className="btn" onClick={() => props.setIsEditing(true)}>Edit</button>

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
          {props.data.map((d) => (
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
