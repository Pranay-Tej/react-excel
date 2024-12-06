import { useExcelContext } from "./excelContext";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import PageNumber from "./PageNumber";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ExcelTr from "./ExcelTr";

type Props = {
  isSortable?: boolean;
};

function Excel(props: Props) {
  const { formattedData, addNewRow, showAllRows, handleDragEnd } =
    useExcelContext();
  const [isAnimationsEnabled, setIsAnimationsEnabled] = useState(true);
  const [parent, enableAnimations] = useAutoAnimate({
    duration: 300,
  });

  const dndKitItemIds = formattedData.map((item) => item.id) ?? [];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // prevent drag action until pointer moves 5px
        // (to fix clicks being registered as drags when only a portion of the card is visible)
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

      {/* <button className="btn" onClick={handleCancel}>
        Cancel
      </button> */}
      {/* <button className="btn" onClick={handleSave} disabled={isInvalid}>
        Save
      </button> */}

      <hr />

      <button className="btn" onClick={showAllRows}>
        Clear filters
      </button>

      <button className="btn" onClick={addNewRow}>
        Add New
      </button>

      <hr />
      <table>
        <thead>
          <tr>
            {/* <th>Sl no. (read)</th> */}
            {props.isSortable && <th>Sl no.</th>}
            <th>Symbol</th>
            {/* <th>id</th> */}
            <th>Type</th>
            <th>Price</th>
            {/* <th>Notes(Optional)</th> */}
            <th>Date</th>
            <th>Hide</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody ref={parent}>
          {props.isSortable ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >
              <SortableContext
                items={dndKitItemIds}
                strategy={verticalListSortingStrategy}
              >
                {formattedData.map((d) => (
                  <ExcelTr key={d.id} order={d} isSortable />
                ))}
              </SortableContext>
            </DndContext>
          ) : (
            formattedData.map((d) => <ExcelTr key={d.id} order={d} />)
          )}
        </tbody>
      </table>

      <PageNumber />
    </div>
  );
}

export default Excel;
