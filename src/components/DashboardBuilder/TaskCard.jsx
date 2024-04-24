import React, { useState } from "react";
import styled from "styled-components";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Task = styled.div`
    background-color: darkgray;
    color: black;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
`;
const DraggingTask = styled.div`
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
const TaskCard = ({ task, deleteTask }) => {
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
            type: "task",
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
            {mouseIsOver && (
                <button onClick={() => deleteTask(task.id)}>remove</button>
            )}
        </Task>
    );
};

export default TaskCard;
