import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ExcelContext } from "./excelContext";
import type {
  ApiPayload,
  ApiPayloadOrder,
  LocalOrder,
  Order,
  Uuid,
} from "../models";
import { NEW_ORDER_PREFIX } from "../constants";
import { isInvalidAmount, isInvalidSymbol, moveItemsInArray } from "../util";
import { faker } from "@faker-js/faker";
import { DragEndEvent } from "@dnd-kit/core";

const ExcelContextProvider = (props: {
  initialData: Order[];
  hiddenOrderIds: Uuid[];
  children: React.ReactNode;
}) => {
  const { initialData, hiddenOrderIds } = props;
  // const [apiData, setApiData] = useState<Order[]>(initialData);
  const [data, setData] = useState<LocalOrder[]>([]);
  const [page, setPage] = useState(1);
  const [highlightedOrderId, setHighlightedOrderId] = useState<Uuid | null>(
    null
  );

  const [updatedOrdersIds, setUpdatedOrdersIds] = useState<Uuid[]>([]);
  const deletedOrdersIdSet = useRef<Set<Uuid>>(new Set());
  const isReOrdered = useRef(false);

  const updatedOrdersIdsSet = useMemo<Set<Uuid>>(() => {
    return new Set(updatedOrdersIds);
  }, [updatedOrdersIds]);

  const hiddenOrdersIdSet = useMemo<Set<Uuid>>(() => {
    return new Set(hiddenOrderIds);
  }, [hiddenOrderIds]);

  const formattedData = useMemo(() => {
    return data
      .filter(({ id }) => !hiddenOrdersIdSet.has(id))
      .sort((a, b) => a.position - b.position)
      .slice((page - 1) * 10, page * 10);
  }, [data, hiddenOrdersIdSet, page]);

  useEffect(() => {
    setData(initialData.map((d, idx) => ({ ...d, position: idx + 1 })));
  }, [initialData]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHighlightedOrderId(null);
    }, 2700);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [highlightedOrderId]);

  const isInvalid = useMemo(() => {
    return data.some(
      (d) => isInvalidAmount(d.amount) || isInvalidSymbol(d.symbol)
    );
  }, [data]);

  const handleValueChange = (updatedValues: Partial<Order>, id: Uuid) => {
    setData((oldData) =>
      oldData.map((d) => (d.id === id ? { ...d, ...updatedValues } : d))
    );
    if (!id.includes(NEW_ORDER_PREFIX) && !updatedOrdersIdsSet.has(id)) {
      setUpdatedOrdersIds((curr) => [...curr, id]);
    }
  };

  const addNewRow = () => {
    const newId = `${NEW_ORDER_PREFIX}${crypto.randomUUID()}`;
    const newState: LocalOrder[] = [
      {
        id: newId,
        amount: faker.number.float({
          min: 100,
          max: 1000,
          fractionDigits: 1,
        }),
        notes: `Order notes`,
        date: new Date(),
        type: "buy",
        position: data.length + 1,
        symbol: "",
      },
      ...data,
    ];
    setData(newState.map((d, idx) => ({ ...d, position: idx + 1 })));
    isReOrdered.current = true;
  };

  const handleCancel = () => {
    // setData(apiData.map((d, idx) => ({ ...d, position: idx + 1 })));
    setUpdatedOrdersIds([]);
    deletedOrdersIdSet.current.clear();
    isReOrdered.current = false;
  };

  const handleSave = (
    onConfirm?: (payload: ApiPayload, data: LocalOrder[]) => void
  ) => {
    if (isInvalid) {
      return;
    }

    const updatedOrders = data.filter((d) => updatedOrdersIdsSet.has(d.id));
    const newOrders: ApiPayloadOrder[] = data
      .filter((d) => d.id.includes(NEW_ORDER_PREFIX))
      .map((d) => {
        const { amount, date, notes, type, symbol } = d;
        return {
          amount,
          date,
          notes,
          type,
          symbol,
          id: d.id.replace(NEW_ORDER_PREFIX, ""),
        };
      });

    const payload: ApiPayload = {
      new_orders: newOrders,
      modified_orders: updatedOrders,
      deleted_orders: Array.from(deletedOrdersIdSet.current),
      ...(isReOrdered.current && {
        updated_arrangement: data
          .sort((a, b) => a.position - b.position)
          .map((d) =>
            d.id.includes(NEW_ORDER_PREFIX)
              ? d.id.replace(NEW_ORDER_PREFIX, "")
              : d.id
          ),
      }),
    };

    onConfirm?.(payload, data);

    // call api, get new data
    // const newData: Order[] = data.map((d) => ({
    //   ...d,
    //   id: d.id.includes(NEW_ORDER_PREFIX) ? crypto.randomUUID() : d.id,
    // }));
    // setApiData(newData);

    // console.log(payload);

    // setUpdatedOrdersIds([]);
    // deletedOrdersIdSet.current.clear();
    // isReOrdered.current = false;
  };

  const deleteRow = (id: Uuid) => {
    setData((oldData) => {
      return oldData
        .filter((d) => d.id !== id)
        .map((item, idx) => ({ ...item, position: idx + 1 }));
    });
    if (!id.includes(NEW_ORDER_PREFIX)) {
      deletedOrdersIdSet.current.add(id);
    }
    isReOrdered.current = true;
  };

  const moveRows = (currentPosition: number, newPosition: number) => {
    setHighlightedOrderId(null);

    const newArr = moveItemsInArray(data, currentPosition - 1, newPosition - 1);

    setData(newArr);

    setPage(Math.ceil(newPosition / 10));
    setHighlightedOrderId(newArr[newPosition - 1].id);
    isReOrdered.current = true;
  };

  const handleDragEnd = useCallback(
    (e: DragEndEvent) => {
      isReOrdered.current = true;

      const { active, over } = e;
      if (active?.id === over?.id) {
        return;
      }
      const oldIndex = formattedData.findIndex((item) => item.id === active.id);
      const newIndex = formattedData.findIndex((item) => item.id === over?.id);
      if (oldIndex === -1 || newIndex === -1) {
        return;
      }

      // the filtered order user sees
      const newFilteredOrder = moveItemsInArray(
        formattedData,
        oldIndex,
        newIndex
      );

      // if the items are filtered, the dragged item should be placed before to the item below it in the original list
      const indexInOriginalList = data.findIndex(
        (item) => item.id === active.id
      );
      if (indexInOriginalList === -1) {
        return;
      }
      let newIndexInOriginalList = -1;
      if (newIndex === formattedData.length - 1) {
        // if moved to the extreme bottom, move to the last in original list
        newIndexInOriginalList = data.length - 1;
      } else {
        // get the item below in new filtered list
        const itemBelowActiveItem = newFilteredOrder[newIndex + 1];
        // get position of that item in original list
        const itemBelowIndexInOriginalList = data.findIndex(
          (item) => item.id === itemBelowActiveItem.id
        );
        // place the dragged item just above that item in original list
        if (newIndex > oldIndex) {
          // dragging down its original position
          newIndexInOriginalList = itemBelowIndexInOriginalList - 1;
        } else {
          // dragging up its original position
          newIndexInOriginalList = itemBelowIndexInOriginalList;
        }
      }
      if (newIndexInOriginalList === -1) {
        return;
      }
      const newItemOrder = moveItemsInArray(
        data,
        indexInOriginalList,
        newIndexInOriginalList
      ).map((item, idx) => ({ ...item, position: idx + 1 }));
      setData(newItemOrder);
      setHighlightedOrderId(newItemOrder[newIndexInOriginalList].id);
    },
    [data, formattedData]
  );

  return (
    <ExcelContext.Provider
      value={{
        data,
        formattedData,
        isInvalid,
        updatedOrdersIdsSet,
        handleValueChange,
        addNewRow,
        handleCancel,
        handleSave,
        deleteRow,
        moveRows,
        page,
        setPage,
        highlightedOrderId,
        handleDragEnd,
      }}
    >
      {props.children}
    </ExcelContext.Provider>
  );
};

export default ExcelContextProvider;
