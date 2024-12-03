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
import { isInvalidAmount } from "./util";

const ExcelContextProvider = (props: { children: React.ReactNode }) => {
  const [apiData, setApiData] = useState<Order[]>(initialData);
  const [data, setData] = useState<LocalOrder[]>([]);
  const [page, setPage] = useState(1);

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
        amount: 100,
        notes: `Order notes`,
        date: new Date(),
        type: "buy",
        position: oldData.length + 1,
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
        const { amount, date, notes, type } = d;
        return {
          amount,
          date,
          notes,
          type,
          id: d.id.replace(NEW_ORDER_PREFIX, ""),
        };
      });

    const payload: ApiPayload = {
      new_orders: newOrders,
      modified_orders: updatedOrders,
      deleted_orders: Array.from(deletedOrdersIdSet.current),
      ...(isReOrdered.current && {
        updated_arrangement: data.map((d) =>
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
    setData((oldData) => oldData.filter((d) => d.id !== id));
    if (!id.includes(NEW_ORDER_PREFIX)) {
      deletedOrdersIdSet.current.add(id);
    }
    isReOrdered.current = true;
  };

  const swapRows = (currentPosition: number, newPosition: number) => {
    setData((curr) => {
      const temp = curr[currentPosition - 1];
      curr[currentPosition - 1] = curr[newPosition - 1];
      curr[currentPosition - 1].position = currentPosition;
      curr[newPosition - 1] = temp;
      curr[newPosition - 1].position = newPosition;
      return [...curr];
    });

    setPage(Math.ceil(newPosition / 10));
    isReOrdered.current = true;
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
        swapRows,
        page,
        setPage
      }}
    >
      {props.children}
    </ExcelContext.Provider>
  );
};

export default ExcelContextProvider;
