import React, {
  useState
} from "react";
import { initialData } from "../constants";
import { BulkEditContext } from "./bulkEditContext";

const BulkEditContextProvider = (props: { children: React.ReactNode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [apiData, setApiData] = useState(initialData);

  return (
    <BulkEditContext.Provider
      value={{
        apiData,
        isEditing,
        setIsEditing,
        setApiData,
      }}
    >
      {props.children}
    </BulkEditContext.Provider>
  );
};

export default BulkEditContextProvider;
