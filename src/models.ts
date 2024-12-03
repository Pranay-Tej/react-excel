export type Uuid = string;

export type OrderType = "buy" | "sell";

export type Order = {
  id: Uuid;
  type: OrderType;
  amount: number;
  notes?: string;
  date: Date;
};

export type LocalOrder = Order & {
  position: number;
};

export type ApiPayloadOrder = {
  id: Uuid;
  type: OrderType;
  amount: number;
  notes?: string;
  date: Date;
};

export type ApiPayload = {
  new_orders: ApiPayloadOrder[];
  modified_orders: ApiPayloadOrder[];
  deleted_orders: Uuid[];
  updated_arrangement?: Uuid[];
};
