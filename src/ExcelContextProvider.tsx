import React, { useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ExcelContext } from "./excelContext";
import type { ApiPayloadOrder, Order, Uuid } from "./models";
import { NEW_ORDER_PREFIX, initialData } from "./constants";
import { isInvalidAmount } from "./util";

const ExcelContextProvider = (props: { children: React.ReactNode }) => {
  const [apiData, setApiData] = useState<Order[]>(initialData);
  const [data, setData] = useState<Order[]>([]);

  const updatedOrdersIdSet = useRef<Set<Uuid>>(new Set());
  const deletedOrdersIdSet = useRef<Set<Uuid>>(new Set());

  useEffect(() => {
    setData(apiData);
  }, [apiData]);

  const isInvalid = useMemo(() => {
    return data.some((d) => isInvalidAmount(d.amount));
  }, [data]);

  const handleValueChange = (updatedValues: Partial<Order>, id: Uuid) => {
    setData((oldData) =>
      oldData.map((d) => (d.id === id ? { ...d, ...updatedValues } : d))
    );
    if (!id.includes(NEW_ORDER_PREFIX)) {
      updatedOrdersIdSet.current.add(id);
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
      },
    ]);
  };

  const handleCancel = () => {
    setData(apiData);
    updatedOrdersIdSet.current.clear();
  };

  const handleSave = () => {
    if (isInvalid) {
      return;
    }

    const updatedOrders = data.filter((d) =>
      updatedOrdersIdSet.current.has(d.id)
    );
    const newOrders: ApiPayloadOrder[] = data
      .filter((d) => d.id.includes(NEW_ORDER_PREFIX))
      .map((d) => {
        const { amount, date, notes, type } = d;
        return { amount, date, notes, type };
      });

    const payload: ApiPayloadOrder[] = [...updatedOrders, ...newOrders];

    // call api, get new data
    const newData: Order[] = data.map((d) => ({
      ...d,
      id: d.id.includes(NEW_ORDER_PREFIX) ? uuidv4() : d.id,
    }));
    setApiData(newData);

    console.log(payload);
    console.log(deletedOrdersIdSet.current);

    updatedOrdersIdSet.current.clear();
    deletedOrdersIdSet.current.clear();
  };

  const deleteRow = (id: Uuid) => {
    setData((oldData) => oldData.filter((d) => d.id !== id));
    if (!id.includes(NEW_ORDER_PREFIX)) {
      deletedOrdersIdSet.current.add(id);
    }
  };

  const swapRows = (idxOne: number, idxTwo: number) => {
    setData((curr) => {
      const temp = curr[idxOne];
      curr[idxOne] = curr[idxTwo];
      curr[idxTwo] = temp;
      return [...curr];
    });
  };

  return (
    <ExcelContext.Provider
      value={{
        data,
        isInvalid,
        handleValueChange,
        addNewRow,
        handleCancel,
        handleSave,
        deleteRow,
        swapRows,
      }}
    >
      {props.children}
    </ExcelContext.Provider>
  );
};

export default ExcelContextProvider;
