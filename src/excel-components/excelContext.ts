import { createContext, useContext } from "react";
import type { ApiPayload, LocalOrder, Order, Uuid } from "../models";
import { DragEndEvent } from "@dnd-kit/core";

type Context = {
  data: LocalOrder[];
  formattedData: LocalOrder[];
  isInvalid: boolean;
  updatedOrdersIdsSet: Set<Uuid>;
  handleValueChange: (updatedValues: Partial<Order>, id: Uuid) => void;
  addNewRow: () => void;
  handleCancel: () => void;
  handleSave: (
    onConfirm?: (payload: ApiPayload, data: LocalOrder[]) => void
  ) => void;
  deleteRow: (id: Uuid) => void;
  moveRows: (currentPosition: number, newPosition: number) => void;
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
  moveRows: () => {},
  page: 1,
  setPage: () => {},
  highlightedOrderId: null,
  handleDragEnd: () => {},
});

const useExcelContext = () => {
  return useContext(ExcelContext);
};

export { ExcelContext, useExcelContext };
