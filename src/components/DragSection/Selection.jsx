import React, { memo } from "react";
import styled from "styled-components";
import { useDrag } from "react-dnd";

import { Colors } from "@/styles/variables";

const SelectionContainer = styled.p`
    font-size: 1.5rem;
    padding: 10px;
    border: 1px solid ${Colors.green};
    height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Selection = memo(({ text, type }) => {
    const [collected, drag, dragPreview] = useDrag(() => ({
        type: type,
        item: { text },
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
