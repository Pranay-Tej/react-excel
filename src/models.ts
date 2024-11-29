export type Uuid = string;

export type OrderType = 'buy' | 'sell'

export type Order = {
  id: Uuid;
  type: OrderType,
  amount: number;
  notes?: string;
  date: Date;
};

export type ApiPayloadOrder = {
  id?: Uuid;
  draftId?: Uuid;
  type: OrderType;
  amount: number;
  notes?: string;
  date: Date;
};

export type ApiPayload = {
  orders: ApiPayloadOrder[];
  deletedOrderIds: Uuid[];
  sequence: Uuid[];
}