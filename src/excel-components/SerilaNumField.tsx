import { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";

type Props = {
  currentPosition: number;
  moveRows: (currentPosition: number, newPosition: number) => void;
  maxValue: number;
};

export default function SerialNumField(props: Props) {
  const { currentPosition, maxValue, moveRows } = props;

  const [value, setValue] = useState(currentPosition);

  useEffect(() => {
    setValue(currentPosition);
  }, [currentPosition]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedMoveRows = useCallback(debounce(moveRows, 400), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newNumber = Math.floor(Number(e.target.value));

    if (newNumber < 1) {
      newNumber = 1;
    }

    if (newNumber > maxValue) {
      newNumber = maxValue;
    }

    setValue(newNumber);

    debouncedMoveRows(props.currentPosition, newNumber);
    // swapRows(props.currentIndex, newNumber - 1);
  };

  return (
    <input
      type="number"
      value={value}
      onChange={handleChange}
      onClick={(e) => (e.target as HTMLInputElement).select()}
    />
  );
}
