export const isInvalidAmount = (amount: number) => {
  return amount <= 0;
};

export const isInvalidNotes = (notes: string) => {
  return notes === "";
};
