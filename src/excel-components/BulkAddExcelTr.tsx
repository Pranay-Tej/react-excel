import clsx from "clsx";
import { format } from "date-fns";
import { LocalOrder, OrderType } from "../models";
import { isInvalidAmount } from "../util";
import { useExcelContext } from "./excelContext";

type Props = {
  order: LocalOrder;
};

export default function BulkAddExcelTr(props: Props) {
  const { order } = props;
  const { handleValueChange, deleteRow } = useExcelContext();

  return (
    <tr>
      <td>{order.symbol}</td>

      <td>
        <select
          value={order.type}
          onChange={(e) =>
            handleValueChange({ type: e.target.value as OrderType }, order.id)
          }
        >
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
      </td>
      <td>
        <input
          type="number"
          value={order.amount}
          onChange={(e) =>
            handleValueChange({ amount: Number(e.target.value) }, order.id)
          }
          className={clsx({
            error: isInvalidAmount(order.amount),
          })}
        />
      </td>

      <td>
        <input
          type="date"
          value={format(order.date, "yyyy-MM-dd")}
          onChange={(e) =>
            handleValueChange({ date: new Date(e.target.value) }, order.id)
          }
        />
      </td>
      <td>
        <button
          className="icon-btn"
          onClick={() => deleteRow(order.id)}
          title="delete"
        >
          ❎
        </button>
      </td>
    </tr>
  );
}
