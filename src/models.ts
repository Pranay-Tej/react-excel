export type Uuid = string;

export type Order = {
  id: Uuid;
  amount: number;
  notes: string;
  date: Date;
};

export type ApiPayloadOrder = {
  id?: Uuid;
  amount: number;
  notes: string;
  date: Date;
};
