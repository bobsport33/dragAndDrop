import React, { useState, useMemo } from "react";
import styled from "styled-components";
import ColumnContainer from "./ColumnContainer";
import { DndContext, DragOverlay, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { PointerSensor } from "@dnd-kit/core";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";

const Dashboard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    height: 100%;
    width: 100%;
    align-items: center;
    overflow-x: auto;
    overflow-y: hidden;

    .dashboard {
        &__column-container {
            display: flex;
            gap: 20px;
        }
        &__container {
            margin: 0 auto;
        }
        &__button {
            height: 60px;
            width: 350px;
            border-radius: 10px;
            background-color: black;
            border: 2px solid gray;
            color: white;
        }
    }
`;

const DashboardBuilder = () => {
    const [columns, setColumns] = useState([]);
    console.log(columns);
    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

    const [activeColumn, setActiveColumn] = useState(null);
    const [activeTask, setActiveTask] = useState(null);
    const [tasks, setTasks] = useState([]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );

    const generateId = () => {
        return Math.floor(Math.random() * 10001);
    };

    const createNewColumn = () => {
        const columnToAdd = {
            id: generateId(),
            title: `Column ${columns.length + 1}`,
        };

        setColumns([...columns, columnToAdd]);
    };

    const deleteColumn = (id) => {
        const filteredColumn = columns.filter((col) => col.id !== id);

        setColumns(filteredColumn);
    };

    const createTask = (columnId) => {
        const newTask = {
            id: generateId(),
            columnId,
            content: `Task ${tasks.length + 1}`,
        };

        setTasks([...tasks, newTask]);
    };

    const deleteTask = (id) => {
        const newTasks = tasks.filter((task) => task.id !== id);

        setTasks(newTasks);
    };

    const onDragStart = (event) => {
        console.log("onDragStaret", event);
        if (event.active.data.current?.type === "column") {
            setActiveColumn(event.active.data.current.column);
            return;
        }
        if (event.active.data.current?.type === "task") {
            setActiveTask(event.active.data.current.task);
            return;
        }
    };

    const onDragOver = (event) => {
        const { active, over } = event;
        if (!over) {
            return;
        }

        console.log(active, "active");
        console.log(over, "over");
        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) {
            return;
        }

        const isActiveATask = active.data.current?.type === "task";
        const isOverATask = over.data.current?.type === "task";

        if (!isActiveATask) {
            return;
        }
        // Dropping a task over another task
        if (isActiveATask && isOverATask) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                const overIndex = tasks.findIndex((t) => t.id === overId);

                if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
                    // Fix introduced after video recording
                    tasks[activeIndex].columnId = tasks[overIndex].columnId;
                    return arrayMove(tasks, activeIndex, overIndex - 1);
                }

                return arrayMove(tasks, activeIndex, overIndex);
            });
        }

        // Dropping a task over a columnc
        const isOverAColum = over.data.current?.type === "column";

        if (isActiveATask && isOverAColum) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);

                tasks[activeIndex].columnId = overId;

                return arrayMove(tasks, activeIndex, activeIndex);
            });
        }
    };

    const onDragEnd = (event) => {
        setActiveColumn(null);
        setActiveTask(null);
        const { active, over } = event;
        if (!over) {
            return;
        }

        console.log(active, "active");
        console.log(over, "over");
        const activeColumId = active.id;
        const overColumnId = over.id;

        if (activeColumId === overColumnId) {
            return;
        }
        setColumns((columns) => {
            const activeColumnIndex = columns.findIndex(
                (col) => col.id === activeColumId
            );
            const overColumIndex = columns.findIndex(
                (col) => col.id === overColumnId
            );

            return arrayMove(columns, activeColumnIndex, overColumIndex);
        });
    };
    return (
        <Dashboard>
            <DndContext
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragEnd={onDragEnd}
                sensors={sensors}
            >
                <div className="dashboard__container">
                    <button
                        className="dashboard__button"
                        onClick={() => createNewColumn()}
                    >
                        Add Column
                    </button>
                </div>
                <div className="dashboard__column-container">
                    <SortableContext items={columnsId}>
                        {columns.map((col) => {
                            return (
                                <ColumnContainer
                                    key={col.id}
                                    column={col}
                                    deleteColumn={deleteColumn}
                                    createTask={createTask}
                                    tasks={tasks.filter(
                                        (task) => task.columnId === col.id
                                    )}
                                    deleteTask={deleteTask}
                                />
                            );
                        })}
                    </SortableContext>
                </div>
                {
                    <DragOverlay>
                        {activeColumn && (
                            <ColumnContainer
                                column={activeColumn}
                                deleteColumn={deleteColumn}
                                createTask={createTask}
                                tasks={tasks.filter(
                                    (task) => task.columnId === activeColumn.id
                                )}
                                deleteTask={deleteTask}
                            />
                        )}
                        {activeTask && <TaskCard task={activeTask} />}
                    </DragOverlay>
                }
            </DndContext>
        </Dashboard>
    );
};

export default DashboardBuilder;
