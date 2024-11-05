import React, { useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ExcelContext } from "./excelContext";
import { ApiPayloadOrder, Order, Uuid } from "./models";
import { NEW_ORDER_PREFIX, initialData } from "./constants";
import { isInvalidAmount, isInvalidNotes } from "./util";

const ExcelContextProvider = (props: { children: React.ReactNode }) => {
  const [apiData, setApiData] = useState<Order[]>(initialData);
  const [data, setData] = useState<Order[]>([]);

  const updatedOrdersIdset = useRef<Set<Uuid>>(new Set());

  useEffect(() => {
    setData(apiData);
  }, [apiData]);

  const isInvalid = useMemo(() => {
    return data.some(
      (d) => isInvalidAmount(d.amount) || isInvalidNotes(d.notes)
    );
  }, [data]);

  const handleValueChange = (updatedValues: Partial<Order>, id: Uuid) => {
    setData((oldData) =>
      oldData.map((d) => (d.id === id ? { ...d, ...updatedValues } : d))
    );
    updatedOrdersIdset.current.add(id);
  };

  const addNewRow = () => {
    const newId = `${NEW_ORDER_PREFIX}-${uuidv4()}`;
    setData((oldData) => [
      ...oldData,
      {
        id: newId,
        amount: 100,
        notes: `Order notes`,
        date: new Date(),
      },
    ]);
  };

  const handleCancel = () => {
    setData(apiData);
    updatedOrdersIdset.current.clear();
  };

  const handleSave = () => {
    if (isInvalid) {
      return;
    }

    const updatedOrders = data.filter(
      (d) =>
        updatedOrdersIdset.current.has(d.id) &&
        d.id.includes(NEW_ORDER_PREFIX) === false
    );
    const newOrders: ApiPayloadOrder[] = data
      .filter((d) => d.id.includes(NEW_ORDER_PREFIX))
      .map((d) => {
        const { amount, date, notes } = d;
        return { amount, date, notes };
      });

    const payload: ApiPayloadOrder[] = [...updatedOrders, ...newOrders];

    // call api, get new data
    const newData: Order[] = data.map((d) => ({
      ...d,
      id: d.id.includes(NEW_ORDER_PREFIX) ? uuidv4() : d.id,
    }));
    setApiData(newData);

    updatedOrdersIdset.current.clear();
    console.log(payload);
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
      }}
    >
      {props.children}
    </ExcelContext.Provider>
  );
};

export default ExcelContextProvider;
