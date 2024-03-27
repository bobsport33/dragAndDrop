import React, { memo } from "react";
import styled from "styled-components";

import { useDrag } from "react-dnd";

const SelectionContainer = styled.div`
    font-size: 1.5rem;
    padding: 10px;
    border: 1px solid black;
`;

const Selection = memo(({ text, kpiValues, setKpiValues }) => {
    const [collected, drag, dragPreview] = useDrag(() => ({
        type: "KPI",
        item: { text },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            // if (dropResult) {
            //     console.log("dr", dropResult.name);
            //     console.log(kpiValues);

            //     const newValues = kpiValues.map((value) => {
            //         if (value.name === dropResult.name) {
            //             // Update only the specific item
            //             return { ...value, currValue: text };
            //         }
            //         // Keep other items intact
            //         return value;
            //     });
            //     console.log(newValues);
            //     setKpiValues(newValues);
            // }
        },
    }));

    return collected.isDragging ? (
        <SelectionContainer ref={dragPreview} />
    ) : (
        <SelectionContainer ref={drag} {...collected}>
            {text}
        </SelectionContainer>
    );
});

export default Selection;
