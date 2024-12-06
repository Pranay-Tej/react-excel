import { createContext, useContext } from "react";
import type { Order } from "../models";

type Context = {
  apiData: Order[];
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  setApiData: (data: Order[]) => void;
};

const BulkEditContext = createContext<Context>({
  apiData: [],
  isEditing: false,
  setIsEditing: () => {},
  setApiData: () => {},
});

const useBulkEditContext = () => {
  return useContext(BulkEditContext);
};

export { BulkEditContext, useBulkEditContext };
