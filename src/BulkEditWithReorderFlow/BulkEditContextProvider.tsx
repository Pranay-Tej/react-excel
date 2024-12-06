import React, { useState } from "react";
import { initialData } from "../constants";
import { BulkEditContext } from "./bulkEditContext";
import type { Uuid } from "../models";

const BulkEditContextProvider = (props: { children: React.ReactNode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [apiData, setApiData] = useState(initialData);
  const [hiddenOrderIds, setHiddenOrderIds] = useState<Uuid[]>([]);

  const hideRow = (id: Uuid) => {
    setHiddenOrderIds((curr) => [...curr, id]);
  };

  const clearFilters = () => {
    setHiddenOrderIds([]);
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
      }}
    >
      {props.children}
    </BulkEditContext.Provider>
  );
};

export default BulkEditContextProvider;
