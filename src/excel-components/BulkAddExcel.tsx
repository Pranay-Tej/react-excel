import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import PageNumber from "./PageNumber";
import { useExcelContext } from "./excelContext";
import BulkAddExcelTr from "./BulkAddExcelTr";

function BulkAddExcel() {
  const { data } = useExcelContext();
  const [isAnimationsEnabled, setIsAnimationsEnabled] = useState(true);
  const [parent, enableAnimations] = useAutoAnimate({
    duration: 300,
  });

  return (
    <div>
      <div>
        <button
          className="btn"
          onClick={() => {
            enableAnimations(!isAnimationsEnabled);
            setIsAnimationsEnabled((curr) => !curr);
          }}
        >
          {isAnimationsEnabled ? "Disable Animations" : "Enable Animations"}
        </button>
      </div>
      <hr />

      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Type</th>
            <th>Price</th>
            <th>Date</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody ref={parent}>
          {data.map((d) => (
            <BulkAddExcelTr key={d.id} order={d} />
          ))}
        </tbody>
      </table>

      <PageNumber />
    </div>
  );
}

export default BulkAddExcel;
