import { Order } from "./models";

export const initialData: Order[] = [
  {
    id: "647bfbb8-20be-40d0-8df5-bd826a9aeac0",
    amount: 100,
    notes: "buying",
    date: new Date("2024-10-01T08:44:29.251Z"),
  },
  {
    id: "3a6c646b-ea40-4742-881b-95628919d9a5",
    amount: 300,
    notes: "selling",
    date: new Date("2024-09-01T08:44:51.283Z"),
  },
];

export const NEW_ORDER_PREFIX = "new-order-";
