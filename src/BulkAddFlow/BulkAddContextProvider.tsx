import React, { useEffect, useState } from "react";
import { NEW_ORDER_PREFIX } from "../constants";
import { BulkAddContext } from "./bulkAddContext";
import type { ApiPayloadNewOrder, Order } from "../models";
import { faker } from "@faker-js/faker";

const BulkAddContextProvider = (props: { children: React.ReactNode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [orderData, setOrderData] = useState<Order[]>([]);
  const [isSimulatingError, setIsSimulatingError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timerRef = React.useRef<number | null>(null);

  const handleAddOrders = () => {
    const newOrders: Order[] = [];
    for (let i = 0; i < 5; i++) {
      const newId = `${NEW_ORDER_PREFIX}${crypto.randomUUID()}`;

      newOrders.push({
        id: newId,
        amount: faker.number.float({
          min: 100,
          max: 1000,
          fractionDigits: 1,
        }),
        notes: `Order notes`,
        date: new Date(),
        type: "buy",
        symbol: faker.finance.currencyCode(),
      });
    }
    setOrderData(newOrders);
    setIsEditing(true);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const onConfirm = (payload: ApiPayloadNewOrder[]) => {
    console.log(payload);
    setError(null);
    setIsLoading(true);
    timerRef.current = setTimeout(() => {
      // call api, get new data

      const newData: Order[] = payload.map((d) => ({
        ...d,
        id: crypto.randomUUID(),
      }));
      if (isSimulatingError) {
        setIsLoading(false);
        setError("Something went wrong. Please try again");
        return;
      }
      setIsLoading(false);
      setOrderData(newData);
      setIsEditing(false);
    }, 1500);
  };

  return (
    <BulkAddContext.Provider
      value={{
        orderData: orderData,
        isEditing,
        setIsEditing,
        setApiData: setOrderData,
        onConfirm,
        isSimulatingError,
        setIsSimulatingError,
        error,
        setError,
        isLoading,
        handleAddOrders,
      }}
    >
      {props.children}
    </BulkAddContext.Provider>
  );
};

export default BulkAddContextProvider;
