import {
  createContext,
  useContext
} from "react";
import { Order, Uuid } from "./models";

type Context = {
  data: Order[];
  isInvalid: boolean;
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
