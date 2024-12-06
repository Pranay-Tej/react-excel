export const isInvalidAmount = (amount: number) => {
  return amount <= 0;
};

export const isInvalidSymbol = (symbol: string) => {
  return symbol === "";
};

export const isInvalidNotes = (notes: string) => {
  return notes === "";
};

export const moveItemsInArray = <T>(
  data: T[],
  from: number,
  to: number
): T[] => {
  const itemToMove = data[from];
  let newArr = [...data.slice(0, from), ...data.slice(from + 1)];
  newArr.splice(to, 0, itemToMove);
  newArr = newArr.map((item, idx) => {
    return {
      ...item,
      position: idx + 1,
    };
  });

  return newArr;
};
