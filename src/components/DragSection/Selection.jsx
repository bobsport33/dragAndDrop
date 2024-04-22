import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Selection = ({ id, name }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: id });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            id={id}
        >
            {name}
        </div>
    );
};

export default Selection;
