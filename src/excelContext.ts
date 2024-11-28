import {
  createContext,
  useContext
} from "react";
import type { Order, Uuid } from "./models";

type Context = {
  data: Order[];
  isInvalid: boolean;
  updatedOrdersIdsSet: Set<Uuid>;
  handleValueChange: (updatedValues: Partial<Order>, id: Uuid) => void;
  addNewRow: () => void;
  handleCancel: () => void;
  handleSave: () => void;
  deleteRow: (id: Uuid) => void;
  swapRows: (idxOne: number, id2: number) => void;
};

const ExcelContext = createContext<Context>({
  data: [],
  isInvalid: false,
  updatedOrdersIdsSet: new Set(),
  handleValueChange: () => {},
  addNewRow: () => {},
  handleCancel: () => {},
  handleSave: () => {},
  deleteRow: () => {},
  swapRows: () => {},
});


const useExcelContext = () => {
  return useContext(ExcelContext);
};

export { ExcelContext, useExcelContext };
