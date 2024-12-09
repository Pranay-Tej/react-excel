import React, { useEffect, useState } from "react";
import { NEW_ORDER_PREFIX, initialData } from "../constants";
import { BulkEditContext } from "./bulkEditContext";
import type { BulkEditApiPayload, LocalOrder, Order, Uuid } from "../models";

const BulkEditContextProvider = (props: { children: React.ReactNode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [apiData, setApiData] = useState(initialData);
  const [hiddenOrderIds, setHiddenOrderIds] = useState<Uuid[]>([]);
  const [isSimulatingError, setIsSimulatingError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timerRef = React.useRef<number | null>(null);

  const hideRow = (id: Uuid) => {
    setHiddenOrderIds((curr) => [...curr, id]);
  };

  const clearFilters = () => {
    setHiddenOrderIds([]);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const onConfirm = (payload: BulkEditApiPayload, data: LocalOrder[]) => {
    console.log(payload);
    setError(null);
    setIsLoading(true);
    timerRef.current = setTimeout(() => {
      // call api, get new data

      const newData: Order[] = data.map((d) => ({
        ...d,
        id: d.id.includes(NEW_ORDER_PREFIX) ? crypto.randomUUID() : d.id,
      }));
      if (isSimulatingError) {
        setIsLoading(false);
        setError("Something went wrong. Please try again");
        return;
      }
      setIsLoading(false);
      setApiData(newData);
      setIsEditing(false);
    }, 1500);
  };

  return (
    <BulkEditContext.Provider
      value={{
        apiData,
        isEditing,
        setIsEditing,
        setApiData,
        hiddenOrderIds,
        hideRow,
        clearFilters,
        onConfirm,
        isSimulatingError,
        setIsSimulatingError,
        error,
        setError,
        isLoading,
      }}
    >
      {props.children}
    </BulkEditContext.Provider>
  );
};

export default BulkEditContextProvider;
