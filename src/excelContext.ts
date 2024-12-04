import { createContext, useContext } from "react";
import type { LocalOrder, Order, Uuid } from "./models";
import { DragEndEvent } from "@dnd-kit/core";

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
  moveRows: (idxOne: number, id2: number) => void;
  page: number;
  setPage: (page: number) => void;
  highlightedOrderId: Uuid | null;
  handleDragEnd: (e: DragEndEvent) => void;
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
  moveRows: () => {},
  page: 1,
  setPage: () => {},
  highlightedOrderId: null,
  handleDragEnd: () => {}
});

const useExcelContext = () => {
  return useContext(ExcelContext);
};

export { ExcelContext, useExcelContext };
