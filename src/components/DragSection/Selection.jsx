import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styled from "styled-components";

const SelectorContainer = styled.div`
    padding: 10px;
    border: 1px black solid;

    &:hover {
        cursor: grab;
    }
`;

const Selection = ({ id, name }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: id });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    return (
        <SelectorContainer
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            id={id}
        >
            {name}
        </SelectorContainer>
    );
};

export default Selection;
