import { createContext, useContext } from "react";
import type { ApiPayload, LocalOrder, Order, Uuid } from "../models";

type Context = {
  apiData: Order[];
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  setApiData: (data: Order[]) => void;
  hiddenOrderIds: Uuid[];
  hideRow: (id: Uuid) => void;
  clearFilters: () => void;
  onConfirm: (payload: ApiPayload, data: LocalOrder[]) => void;
  isSimulatingError: boolean;
  setIsSimulatingError: (isSimulatingError: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  isLoading: boolean;
};

const BulkEditContext = createContext<Context>({
  apiData: [],
  isEditing: false,
  setIsEditing: () => {},
  setApiData: () => {},
  hiddenOrderIds: [],
  hideRow: () => {},
  clearFilters: () => {},
  onConfirm: () => {},
  isSimulatingError: false,
  setIsSimulatingError: () => {},
  error: null,
  setError: () => {},
  isLoading: false,
});

const useBulkEditContext = () => {
  return useContext(BulkEditContext);
};

export { BulkEditContext, useBulkEditContext };
