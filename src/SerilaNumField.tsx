import { useState } from "react";
// import { useCallback, useState } from "react";
import { useExcelContext } from "./excelContext";
// import debounce from 'lodash/debounce';

type Props = {
    currentIndex: number;
}

export default function SerialNumField(props: Props) {
    const [value, setValue] = useState(props.currentIndex + 1);

    const { data, swapRows } = useExcelContext()

    // const debouncedSwapRows = useCallback(
    //     debounce(swapRows, 250),
    //     [],
    //   );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        let newNumber = Number(e.target.value);

        if (newNumber < 1) {
            newNumber = 1;
        }

        if (newNumber > data.length) {
            newNumber = data.length;
        }

        setValue(Number(e.target.value));


        // debouncedSwapRows(props.currentIndex, newNumber - 1);
        swapRows(props.currentIndex, newNumber - 1);
    }

    return <input type="number" value={value} onChange={handleChange} onClick={(e) => (e.target as HTMLInputElement).select()} />
}