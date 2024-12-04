import { useCallback, useState } from "react";
import { useExcelContext } from "./excelContext";
import debounce from 'lodash/debounce';

type Props = {
    currentPosition: number;
}

export default function SerialNumField(props: Props) {
    const [value, setValue] = useState(props.currentPosition);

    const { data, moveRows } = useExcelContext()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedMoveRows = useCallback(
        debounce(moveRows, 400),
        [],
      );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        let newNumber = Math.floor(Number(e.target.value));

        if (newNumber < 1) {
            newNumber = 1;
        }

        if (newNumber > data.length) {
            newNumber = data.length;
        }

        setValue(newNumber);


        debouncedMoveRows(props.currentPosition, newNumber);
        // swapRows(props.currentIndex, newNumber - 1);
    }

    return <input type="number" value={value} onChange={handleChange} onClick={(e) => (e.target as HTMLInputElement).select()} />
}