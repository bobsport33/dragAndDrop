import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useMemo } from "react";
import { styled } from "@mui/material";
import TaskCard from "./TaskCard";

const Column = styled("div")`
    background-color: transparent;
    width: 20%;
    height: 200px;
    border-radius: 10px;
    border: 1px dashed black;
    display: flex;
    flex-direction: column;
    color: #fafafa;
    border-radius: 10px;
    overflow: hidden;
    flex-shrink: 0;
    scroll-snap-align: start;

    .column {
        &__background {
            opacity: 0.6;
        }

        &__content {
            padding: 20px;
            gap: 20px;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            justify-content: center;
            flex-grow: 1;
        }

        &__add-btn {
            border: none;
            background-color: black;
            color: #fafafa;
            height: 50px;
        }
    }
`;
const BackgroundColumn = styled("div")`
    opacity: 0.6;
    border: 2px solid red;
    background-color: #333;
    width: 20%;
    height: 500px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    color: #fafafa;
    border-radius: 10px;
    overflow: hidden;
`;

const ColumnContainer = ({ column, tasks, deleteTask }) => {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: column.id,
        data: {
            type: "column",
            column,
        },
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    const tasksIds = useMemo(() => {
        return tasks.map((task) => task.id);
    }, [tasks]);

    if (isDragging) {
        return (
            <BackgroundColumn ref={setNodeRef} style={style}></BackgroundColumn>
        );
    }
    return (
        <Column ref={setNodeRef} style={style}>
            <div className="column__content">
                <SortableContext items={tasksIds}>
                    {tasks.map((task) => {
                        return (
                            <TaskCard
                                key={task.id}
                                task={task}
                                deleteTask={deleteTask}
                            />
                        );
                    })}
                </SortableContext>
            </div>
        </Column>
    );
};

export default ColumnContainer;
