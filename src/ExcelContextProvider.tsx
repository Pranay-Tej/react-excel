import React, { useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ExcelContext } from "./excelContext";
import type {
  ApiPayload,
  ApiPayloadOrder,
  LocalOrder,
  Order,
  Uuid,
} from "./models";
import { NEW_ORDER_PREFIX, initialData } from "./constants";
import { isInvalidAmount, moveItemsInArray } from "./util";
import { faker } from "@faker-js/faker";

const ExcelContextProvider = (props: { children: React.ReactNode }) => {
  const [apiData, setApiData] = useState<Order[]>(initialData);
  const [data, setData] = useState<LocalOrder[]>([]);
  const [page, setPage] = useState(1);
  const [highlightedOrderId, setHighlightedOrderId] = useState<Uuid | null>(
    null
  );

  const [updatedOrdersIds, setUpdatedOrdersIds] = useState<Uuid[]>([]);
  const [hiddenOrderIds, setHiddenOrderIds] = useState<Uuid[]>([]);
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
      .slice((page - 1) * 10, page * 10)
      .filter(({ id }) => !hiddenOrdersIdSet.has(id))
      .sort((a, b) => a.position - b.position);
  }, [data, hiddenOrdersIdSet, page]);

  useEffect(() => {
    setData(apiData.map((d, idx) => ({ ...d, position: idx + 1 })));
  }, [apiData]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHighlightedOrderId(null);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [highlightedOrderId]);

  const isInvalid = useMemo(() => {
    return data.some((d) => isInvalidAmount(d.amount));
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
    const newId = `${NEW_ORDER_PREFIX}${uuidv4()}`;
    setData((oldData) => [
      ...oldData,
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
        position: oldData.length + 1,
        symbol: faker.finance.currencyCode(),
      },
    ]);
    isReOrdered.current = true;
  };

  const handleCancel = () => {
    setData(apiData.map((d, idx) => ({ ...d, position: idx + 1 })));
    setUpdatedOrdersIds([]);
    deletedOrdersIdSet.current.clear();
    isReOrdered.current = false;
  };

  const handleSave = () => {
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

    // call api, get new data
    const newData: Order[] = data.map((d) => ({
      ...d,
      id: d.id.includes(NEW_ORDER_PREFIX) ? uuidv4() : d.id,
    }));
    setApiData(newData);

    console.log(payload);

    setUpdatedOrdersIds([]);
    deletedOrdersIdSet.current.clear();
    isReOrdered.current = false;
  };

  const hideRow = (id: Uuid) => {
    setHiddenOrderIds((curr) => [...curr, id]);
  };

  const showAllRows = () => {
    setHiddenOrderIds([]);
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

  const reorderData = (newData: LocalOrder[]) => {
    isReOrdered.current = true;
    setData(newData);
  };

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
        hideRow,
        showAllRows,
        deleteRow,
        moveRows,
        page,
        setPage,
        highlightedOrderId,
        reorderData,
      }}
    >
      {props.children}
    </ExcelContext.Provider>
  );
};

export default ExcelContextProvider;
