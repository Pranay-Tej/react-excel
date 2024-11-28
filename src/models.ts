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
  type: OrderType;
  amount: number;
  notes?: string;
  date: Date;
};
