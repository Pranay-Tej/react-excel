import React, {
  useEffect,
  useMemo,
  useState
} from "react";
import { v4 as uuidv4 } from "uuid";
import { ExcelContext } from "./excelContext";
import { Order, Uuid } from "./models";

const ExcelContextProvider = (props: { children: React.ReactNode }) => {
  const [apiData, setApiData] = useState<Order[]>([
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
  ]);
  const [data, setData] = useState<Order[]>([]);

  useEffect(() => {
    setData(apiData);
  }, [apiData]);

  const isInvalid = useMemo(() => {
    return data.some((d) => d.amount <= 0 || d.notes === "");
  }, [data]);

  const handleValueChange = (updatedValues: Partial<Order>, id: Uuid) => {
    setData((oldData) =>
      oldData.map((d) => (d.id === id ? { ...d, ...updatedValues } : d))
    );
  };

  const addNewRow = () => {
    const newId = `new-${uuidv4()}`;
    setData((oldData) => [
      ...oldData,
      {
        id: newId,
        amount: 100,
        notes: `Order notes`,
        date: new Date(),
      },
    ]);
  };

  const handleCancel = () => {
    setData(apiData);
  };

  const handleSave = () => {
    if (isInvalid) {
      return;
    }
    const newData = data.map((d) => ({
      ...d,
      id: d.id.includes("new") ? uuidv4() : d.id,
    }));
    setApiData(newData);
  };

  return (
    <ExcelContext.Provider
      value={{
        data,
        isInvalid,
        handleValueChange,
        addNewRow,
        handleCancel,
        handleSave,
      }}
    >
      {props.children}
    </ExcelContext.Provider>
  );
};

export default ExcelContextProvider;
