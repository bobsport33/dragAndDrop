import React, { useState } from "react";
import { styled } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const Task = styled("div")`
    background-color: white;
    border: 1px solid black;
    color: black;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;

    .task {
        &__button {
            background-color: transparent;
            border: none;

            svg {
                pointer-events: none;
            }

            &:hover {
                cursor: pointer;
            }
        }
    }

    &:hover {
        cursor: grab;
    }
`;
const DraggingTask = styled("div")`
    background-color: darkgray;
    color: black;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    opacity: 0.6;
    border: 2px solid red;
`;
const ChartCard = ({ task, deleteTask }) => {
    const [mouseIsOver, setMouseIsOver] = useState(false);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: "chart",
            task,
        },
    });
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    if (isDragging) {
        return <DraggingTask ref={setNodeRef} style={style}></DraggingTask>;
    }

    return (
        <Task
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            onMouseEnter={() => setMouseIsOver(true)}
            onMouseLeave={() => setMouseIsOver(false)}
        >
            {task.content}
            <DragIndicatorIcon />
            {mouseIsOver && !isDragging && task.columnId !== "" && (
                <button
                    className="task__button"
                    onClick={() => deleteTask(task.id)}
                >
                    <DeleteIcon />
                </button>
            )}
        </Task>
    );
};

export default ChartCard;
