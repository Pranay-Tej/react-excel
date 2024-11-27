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
};

const ExcelContext = createContext<Context>({
  data: [],
  isInvalid: false,
  handleValueChange: () => {},
  addNewRow: () => {},
  handleCancel: () => {},
  handleSave: () => {},
  deleteRow: () => {}
});


const useExcelContext = () => {
  return useContext(ExcelContext);
};

export { ExcelContext, useExcelContext };
