import { useExcelContext } from "./excelContext";
import { moveItemsInArray } from "./util";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useCallback, useState } from "react";
import PageNumber from "./PageNumber";
import {
  DndContext,
  DragEndEvent,
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

function Excel() {
  const {
    data,
    formattedData,
    isInvalid,
    addNewRow,
    handleCancel,
    handleSave,
    showAllRows,
    reorderData,
  } = useExcelContext();
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

  const handleDragEnd = useCallback(
    (e: DragEndEvent) => {
      const { active, over } = e;
      if (active?.id === over?.id) {
        return;
      }
      const oldIndex = formattedData.findIndex((item) => item.id === active.id);
      const newIndex = formattedData.findIndex((item) => item.id === over?.id);
      if (oldIndex === -1 || newIndex === -1) {
        return;
      }

      // the filtered order user sees
      const newFilteredOrder = moveItemsInArray(
        formattedData,
        oldIndex,
        newIndex
      );

      // if the items are filtered, the dragged item should be placed before to the item below it in the original list
      const indexInOriginalList = data.findIndex(
        (item) => item.id === active.id
      );
      if (indexInOriginalList === -1) {
        return;
      }
      let newIndexInOriginalList = -1;
      if (newIndex === formattedData.length - 1) {
        // if moved to the extreme bottom, move to the last in original list
        newIndexInOriginalList = data.length - 1;
      } else {
        // get the item below in new filtered list
        const itemBelowActiveItem = newFilteredOrder[newIndex + 1];
        // get position of that item in original list
        const itemBelowIndexInOriginalList = data.findIndex(
          (item) => item.id === itemBelowActiveItem.id
        );
        // place the dragged item just above that item in original list
        if (newIndex > oldIndex) {
          // dragging down its original position
          newIndexInOriginalList = itemBelowIndexInOriginalList - 1;
        } else {
          // dragging up its original position
          newIndexInOriginalList = itemBelowIndexInOriginalList;
        }
      }
      if (newIndexInOriginalList === -1) {
        return;
      }
      const newItemOrder = moveItemsInArray(
        data,
        indexInOriginalList,
        newIndexInOriginalList
      ).map((item, idx) => ({ ...item, position: idx + 1 }));
      reorderData(newItemOrder);
    },
    [data, formattedData]
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

      <button className="btn" onClick={handleCancel}>
        Cancel
      </button>
      <button className="btn" onClick={handleSave} disabled={isInvalid}>
        Save
      </button>

      <hr />

      <button className="btn" onClick={showAllRows}>
        Clear filters
      </button>

      <hr />
      <table>
        <thead>
          <tr>
            {/* <th>Sl no. (read)</th> */}
            <th>Sl no.</th>
            <th>id</th>
            <th>Type</th>
            <th>Price</th>
            {/* <th>Notes(Optional)</th> */}
            <th>Date</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody ref={parent}>
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
                <ExcelTr key={d.id} order={d} />
              ))}
            </SortableContext>
          </DndContext>
        </tbody>
      </table>

      <PageNumber />
      <hr />

      <button className="btn" onClick={addNewRow}>
        Add New
      </button>
    </div>
  );
}

export default Excel;
