import { createContext, useContext } from "react";
import type { LocalOrder, Order, Uuid } from "./models";

type Context = {
  data: LocalOrder[];
  formattedData: LocalOrder[];
  isInvalid: boolean;
  updatedOrdersIdsSet: Set<Uuid>;
  handleValueChange: (updatedValues: Partial<Order>, id: Uuid) => void;
  addNewRow: () => void;
  handleCancel: () => void;
  handleSave: () => void;
  deleteRow: (id: Uuid) => void;
  hideRow: (id: Uuid) => void;
  showAllRows: () => void;
  swapRows: (idxOne: number, id2: number) => void;
  page: number;
  setPage: (page: number) => void;
  highlightedOrderId: Uuid | null;
};

const ExcelContext = createContext<Context>({
  data: [],
  formattedData: [],
  isInvalid: false,
  updatedOrdersIdsSet: new Set(),
  handleValueChange: () => {},
  addNewRow: () => {},
  handleCancel: () => {},
  handleSave: () => {},
  deleteRow: () => {},
  hideRow: () => {},
  showAllRows: () => {},
  swapRows: () => {},
  page: 1,
  setPage: () => {},
  highlightedOrderId: null,
});

const useExcelContext = () => {
  return useContext(ExcelContext);
};

export { ExcelContext, useExcelContext };
