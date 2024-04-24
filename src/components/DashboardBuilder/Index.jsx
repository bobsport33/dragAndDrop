import React, { useState, useMemo, useRef } from "react";
import { styled } from "@mui/material";
import ColumnContainer from "./ColumnContainer";
import {
    DndContext,
    DragOverlay,
    useSensor,
    useSensors,
    PointerSensor,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import TaskCard from "./TaskCard";
import SelectionAccordion from "./SelectionAccordion";
import ChartContainer from "./ChartContainer";

const Dashboard = styled("div")`
    display: flex;
    height: 100%;
    width: 100%;

    .dashboard {
        &__selections-container {
            width: 20%;
            height: 100%;
            background-color: #fff;
        }
        &__builder-container {
            width: 80%;
            padding: 15px;
        }
        &__selection-summary {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        &__category-title {
            font-size: 1.3rem;
        }

        &__kpi-row {
            position: relative;
        }
        &__kpi-carousel {
            display: flex;
            gap: 20px;
            overflow-x: scroll;
        }

        &__chart-row {
            display: flex;
            justify-content: center;
            margin-top: 50px;
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
        &__carousel-btn {
            position: absolute;
            top: calc(50% - 18px);
            height: 36px;
            background-color: tan;
            border: none;
            border-radius: 5px;

            &:hover {
                cursor: pointer;
            }

            svg {
                pointer-events: none;
                color: var(--neutral900);
                height: 100%;
                width: 100%;
            }
            &--prev {
                left: -16px;
            }
            &--next {
                right: -16px;
            }
        }
    }
`;

const DashboardBuilder = () => {
    // Default Bins to drop kpis into
    const [columns, setColumns] = useState([
        { id: "kpi0" },
        { id: "kpi1" },
        { id: "kpi2" },
        { id: "kpi3" },
        { id: "kpi4" },
        { id: "kpi5" },
        { id: "kpi6" },
        { id: "kpi7" },
        { id: "kpi8" },
        { id: "kpi9" },
    ]);

    // array of IDs for sortableContext, updates when columns updates
    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

    // activeColumn and activeTask are for the DragOverlay function
    const [activeColumn, setActiveColumn] = useState(null);
    const [activeTask, setActiveTask] = useState(null);
    const [activeChart, setActiveChart] = useState(null);

    // Initial kpis, will need to set based off user favorites
    const [tasks, setTasks] = useState([
        {
            content: "Total Questions",
            id: "8d140599-0def-46e5-b8ba-367cb8efe31d",
            columnId: "",
        },
        {
            content: "Total Open Questions",
            id: "0ee86ea3-398d-4d5d-806f-88ae110f6781",
            columnId: "",
        },
        {
            content: "Total Completed Questions",
            id: "f7501291-33c5-4440-afe9-3986c37b605d",
            columnId: "",
        },
        {
            content: "Total Products",
            id: "07dd607f-7151-41f6-8a24-0b47302bf86d",
            columnId: "",
        },
        {
            content: "Total Cases",
            id: "4947c533-9d62-4cdf-968d-ab39b57236c6",
            columnId: "",
        },
        {
            content: "Total Open Cases",
            id: "1d71cb79-41fd-4734-ab95-9c0aebfdc41d",
            columnId: "",
        },
        {
            content: "Total Completed Cases",
            id: "66da21bc-13fe-4772-8ca4-b17a8c8c9a4d",
            columnId: "",
        },
        {
            content: "Total Contacts",
            id: "9453e49c-3e1c-4e7c-9fd1-b1bd72be0262",
            columnId: "",
        },
    ]);

    // Array of IDs for the SortableContext in the main dropdown
    const defaultTaskIds = useMemo(() => {
        return tasks
            .filter((task) => {
                return task.columnId === "";
            })
            .map((task) => {
                return task.id;
            });
    }, [tasks]);

    const [charts, setCharts] = useState([
        {
            content: "Questions by Category",
            id: "5364344a-0dd5-4430-aa84-7ac60f7864f0",
            columnId: "",
        },
        {
            content: "Questions by Classification",
            id: "b5b6de67-db1f-47a2-adec-dcac5321c888",
            columnId: "",
        },
        {
            content: "Questions by Current Owner",
            id: "70a48317-ec57-438e-9309-f750758209cd",
            columnId: "",
        },
        {
            content: "Questions by Divisoin",
            id: "d32ed392-e742-4fff-97d1-d3220440155c",
            columnId: "",
        },
        {
            content: "Questions by Global Product",
            id: "1362b355-e4fe-4b7e-9cc8-2a370a38584a",
            columnId: "",
        },
        {
            content: "Questions by Product Code",
            id: "548ebd4d-ddd8-4112-af82-40307dcf75f4",
            columnId: "",
        },
    ]);

    // Array of IDs for the SortableContext in the main dropdown
    const defaultChartIds = useMemo(() => {
        return charts
            .filter((chart) => {
                return chart.columnId === "";
            })
            .map((chart) => {
                return chart.id;
            });
    }, [charts]);

    // Logic for carousel buttons for the kpi row
    const [kpiCardIndex, setKpiCardIndex] = useState(0);
    const carousel = useRef(null);

    const buttonClickHandler = (e) => {
        const targetId = e.target.id;

        const binContainer = document.querySelector(".dashboard__kpi-row");
        const cardWidthPercentage = 20; // Width of each card in percentage
        const containerWidth = binContainer.offsetWidth; // Width of the parent container in pixels
        const cardOffset = (containerWidth * cardWidthPercentage) / 100;

        if (targetId === "prev") {
            carousel.current.scroll(
                carousel.current.scrollLeft - cardOffset,
                0
            );
            setKpiCardIndex((curr) => curr - 1);
        }
        if (targetId === "next") {
            if (kpiCardIndex !== columns.length - 1) {
                carousel.current.scroll(
                    carousel.current.scrollLeft + cardOffset,
                    0
                );
                setKpiCardIndex((curr) => curr + 1);
            }
        }
    };

    // defaults sensors for the dnd kit
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );

    // removes a kpi from a container and adds it back to the main list
    const deleteTask = (id) => {
        setTasks((tasks) => {
            return tasks.map((task) => {
                if (task.id === id) {
                    return { ...task, columnId: "" };
                }
                return task;
            });
        });
    };

    // function to handle dnd kit drag start
    const onDragStart = (event) => {
        console.log("start", event);
        if (event.active.data.current?.type === "column") {
            setActiveColumn(event.active.data.current.column);
            return;
        }
        if (event.active.data.current?.type === "task") {
            setActiveTask(event.active.data.current.task);
            return;
        }
        if (event.active.data.current?.type === "chart") {
            setActiveChart(event.active.data.current.task);
        }
    };

    // function to handle dnd kit onDragOver. Will move kpis to other containers on hover
    const onDragOver = (event) => {
        const { active, over } = event;
        console.log("over", active, over);
        if (!over) {
            return;
        }

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) {
            return;
        }

        const isActiveATask = active.data.current?.type === "task";
        const isOverATask = over.data.current?.type === "task";

        console.log("is active a task", isActiveATask);
        if (!isActiveATask) {
            return;
        }
        // Dropping a task over another task
        if (isActiveATask && isOverATask) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                const overIndex = tasks.findIndex((t) => t.id === overId);

                if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
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

    // Drag End function for dnd kit
    const onDragEnd = (event) => {
        setActiveColumn(null);
        setActiveTask(null);
        setActiveChart(null);
        const { active, over } = event;
        if (!over) {
            return;
        }

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
                <div className="dashboard__selections-container">
                    <SelectionAccordion
                        title="KPI"
                        selections={tasks}
                        defaultIds={defaultTaskIds}
                        type="task"
                    />
                    <SelectionAccordion
                        title="Charts"
                        selections={charts}
                        defaultIds={defaultChartIds}
                        type="chart"
                    />
                </div>
                <div className="dashboard__builder-container">
                    <div className="dashboard__kpi-row">
                        <div className="dashboard__kpi-carousel" ref={carousel}>
                            <button
                                className="dashboard__carousel-btn dashboard__carousel-btn--prev"
                                id="prev"
                                onClick={buttonClickHandler}
                            >
                                <ArrowLeftIcon />
                            </button>
                            <button
                                className="dashboard__carousel-btn dashboard__carousel-btn--next"
                                id="next"
                                onClick={buttonClickHandler}
                            >
                                <ArrowRightIcon />
                            </button>
                            <SortableContext items={columnsId}>
                                {columns.map((col) => {
                                    return (
                                        <ColumnContainer
                                            key={col.id}
                                            column={col}
                                            tasks={tasks.filter(
                                                (task) =>
                                                    task.columnId === col.id
                                            )}
                                            deleteTask={deleteTask}
                                        />
                                    );
                                })}
                            </SortableContext>{" "}
                        </div>
                    </div>
                    <div className="dashboard__chart-row">
                        <ChartContainer
                            column="chart"
                            charts={charts.filter(
                                (chart) => chart.columnId === "chart"
                            )}
                            deleteTask={deleteTask}
                        />
                    </div>
                </div>
                {
                    <DragOverlay>
                        {activeTask && <TaskCard task={activeTask} />}
                        {activeChart && (
                            <TaskCard task={activeChart} type="chart" />
                        )}
                    </DragOverlay>
                }
            </DndContext>
        </Dashboard>
    );
};

export default DashboardBuilder;
