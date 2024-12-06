import { createContext, useContext } from "react";
import type { Order, Uuid } from "../models";

type Context = {
  apiData: Order[];
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  setApiData: (data: Order[]) => void;
  hiddenOrderIds: Uuid[];
  hideRow: (id: Uuid) => void;
  clearFilters: () => void;
};

const BulkEditContext = createContext<Context>({
  apiData: [],
  isEditing: false,
  setIsEditing: () => {},
  setApiData: () => {},
  hiddenOrderIds: [],
  hideRow: () => {},
  clearFilters: () => {},
});

const useBulkEditContext = () => {
  return useContext(BulkEditContext);
};

export { BulkEditContext, useBulkEditContext };
