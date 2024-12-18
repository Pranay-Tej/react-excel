import clsx from "clsx";
import { useExcelContext } from "./excelContext";
import { LocalOrder, OrderType } from "../models";
import { NEW_ORDER_PREFIX } from "../constants";
import SerialNumField from "./SerilaNumField";
import { isInvalidAmount, isInvalidSymbol } from "../util";
import { format } from "date-fns";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useRef } from "react";

type Props = {
  order: LocalOrder;
  isSortable?: boolean;
};

export default function BulkEditExcelTr(props: Props) {
  const { order, isSortable = false } = props;
  const {
    data,
    updatedOrdersIdsSet,
    handleValueChange,
    deleteRow,
    highlightedOrderId,
    moveRows,
  } = useExcelContext();

  const rowRef = useRef<HTMLTableRowElement>(null);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.order.id,
      disabled: isSortable === false,
    });
  const dndProps = { ...attributes, ...listeners };

  useEffect(() => {
    if (rowRef.current) {
      setNodeRef(rowRef.current);
    }
  }, [setNodeRef]);

  return (
    // <tr key={d.id} className={d.id.includes(NEW_ORDER_PREFIX) ? 'new' : ''}>

    <tr
      className={clsx({
        new: order.id.includes(NEW_ORDER_PREFIX),
        edited: updatedOrdersIdsSet.has(order.id),
        highlighted: order.id === highlightedOrderId,
      })}
      ref={rowRef}
      style={{
        userSelect: "none",
        ...(isSortable && { cursor: "grab" }),
        transform: CSS.Transform.toString(
          transform
            ? {
                ...transform,
                scaleY: 1,
                // prevent stretching, compressing
                // as cards are of different heights
              }
            : null
        ),
        transition: transition as string,
      }}
      {...dndProps}
    >
      {/* <td>{d.position}</td> */}
      {isSortable && (
        <td>
          <SerialNumField
            currentPosition={order.position}
            maxValue={data.length}
            moveRows={moveRows}
          />
        </td>
      )}
      <td>
        <input
          type="text"
          value={order.symbol}
          onChange={(e) =>
            handleValueChange({ symbol: e.target.value }, order.id)
          }
          className={clsx({
            error: isInvalidSymbol(order.symbol),
          })}
        />
      </td>

      {/* <td>{order.id}</td> */}
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
