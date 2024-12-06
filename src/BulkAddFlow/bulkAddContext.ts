import { createContext, useContext } from "react";
import type { ApiPayload, LocalOrder, Order } from "../models";

type Context = {
  orderData: Order[];
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  setApiData: (data: Order[]) => void;
  onConfirm: (payload: ApiPayload, data: LocalOrder[]) => void;
  isSimulatingError: boolean;
  setIsSimulatingError: (isSimulatingError: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  isLoading: boolean;
  handleAddOrders: () => void;
};

const BulkAddContext = createContext<Context>({
  orderData: [],
  isEditing: false,
  setIsEditing: () => {},
  setApiData: () => {},
  onConfirm: () => {},
  isSimulatingError: false,
  setIsSimulatingError: () => {},
  error: null,
  setError: () => {},
  isLoading: false,
  handleAddOrders: () => {},
});

const useBulkAddContext = () => {
  return useContext(BulkAddContext);
};

export { BulkAddContext, useBulkAddContext };
