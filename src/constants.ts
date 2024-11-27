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
  {
    id: "d4f5e6a7-8b9c-4d2f-8e3b-1a2b3c4d5e6f",
    amount: 150,
    notes: "buying",
    date: new Date("2024-08-01T08:45:00.000Z"),
  },
  {
    id: "e7f8g9h0-1i2j-3k4l-5m6n-7o8p9q0r1s2t",
    amount: 250,
    notes: "selling",
    date: new Date("2024-07-01T08:46:00.000Z"),
  },
  {
    id: "f1g2h3i4-5j6k-7l8m-9n0o-1p2q3r4s5t6u",
    amount: 200,
    notes: "buying",
    date: new Date("2024-06-01T08:47:00.000Z"),
  },
  {
    id: "g7h8i9j0-1k2l-3m4n-5o6p-7q8r9s0t1u2v",
    amount: 350,
    notes: "selling",
    date: new Date("2024-05-01T08:48:00.000Z"),
  },
  {
    id: "h1i2j3k4-5l6m-7n8o-9p0q-1r2s3t4u5v6w",
    amount: 400,
    notes: "buying",
    date: new Date("2024-04-01T08:49:00.000Z"),
  },
];

export const NEW_ORDER_PREFIX = "new-order-";
