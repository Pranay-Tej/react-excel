export type Uuid = string;

export type Order = {
  id: Uuid;
  amount: number;
  notes: string;
  date: Date;
};