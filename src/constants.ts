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
  {
    id: "i3j4k5l6-7m8n-9o0p-1q2r-3s4t5u6v7w8x",
    amount: 500,
    notes: "selling",
    date: new Date("2024-03-01T08:50:00.000Z"),
  },
  {
    id: "j5k6l7m8-9n0o-1p2q-3r4s-5t6u7v8w9x0y",
    amount: 600,
    notes: "buying",
    date: new Date("2024-02-01T08:51:00.000Z"),
  },
  {
    id: "k7l8m9n0-1o2p-3q4r-5s6t-7u8v-9w0x1y2z",
    amount: 700,
    notes: "selling",
    date: new Date("2024-01-01T08:52:00.000Z"),
  },
  {
    id: "l9m0n1o2-3p4q-5r6s-7t8u-9v0w-1x2y3z4a",
    amount: 800,
    notes: "buying",
    date: new Date("2023-12-01T08:53:00.000Z"),
  },
  {
    id: "m1n2o3p4-5q6r-7s8t-9u0v-1w2x-3y4z5a6b",
    amount: 900,
    notes: "selling",
    date: new Date("2023-11-01T08:54:00.000Z"),
  },
  {
    id: "n3o4p5q6-7r8s-9t0u-1v2w-3x4y-5z6a7b8c",
    amount: 1000,
    notes: "buying",
    date: new Date("2023-10-01T08:55:00.000Z"),
  },
];

export const NEW_ORDER_PREFIX = "new-order-";
