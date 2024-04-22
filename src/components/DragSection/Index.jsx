import React, { useState } from "react";
import styled from "styled-components";
import {
    DndContext,
    closestCenter,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import Selection from "./Selection";

import Button from "../Button/Index";
import { Colors } from "@/styles/variables";
import {
    SortableContext,
    arrayMove,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const Drag = styled.div`
    min-width: 90vw;
    width: 80%;
    margin: 0 auto;

    border-radius: 20px;
    background-color: ${Colors.darkGreen};
    color: ${Colors.lightGreen};
    padding: 20px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 30px;

    .selection {
        &__container {
            width: 80%;
            height: 100%;
            display: flex;

            gap: 5px;
        }
        &__column {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            width: 100%;
            height: 100%;
        }
    }

    .bin {
        &__container {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 20px;
        }
        &__kpi-container {
            width: 100%;
            height: 100%;
        }

        &__chart-container {
            height: 300px;
            width: 100%;
            display: flex;
            gap: 20px;
        }
        &__kpi-row {
            display: flex;
            gap: 15px;
            height: 200px;
            width: 100%;
        }
    }

    .selection__column {
        display: flex;
        flex-direction: column;
    }

    .drop-containers {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .chart-container {
        height: 400px;
        width: 400px;
        border: 1px dashed black;
        display: flex;
        flex-direction: column;
    }

    .selection__wrapper {
        height: 800px;
        background-color: #fafafa;
        width: 300px;
    }
`;

const DragSection = ({ kpiOptions, chartOptions }) => {
    const [chartContainers, setChartContainers] = useState([
        {
            name: "initial Charts",
            charts: [
                { id: 1, name: "Total Questions" },
                { id: 2, name: "Total Open Quesstions" },
                { id: 3, name: "Total Open Cases" },
                { id: 4, name: "Total Cases" },
            ],
        },
        { name: "selected Charts", charts: [{ id: 5, name: " placeholder" }] },
    ]);

    const mouseSensor = useSensor(MouseSensor);
    const touchSensor = useSensor(TouchSensor);

    const sensors = useSensors(mouseSensor, touchSensor);

    const handleDragMove = (event) => {};

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            return;
        }

        const sourceContainerIndex = chartContainers.findIndex((container) =>
            container.charts.find((chart) => chart.id === active.id)
        );
        const destinationContainerIndex = chartContainers.findIndex(
            (container) =>
                container.charts.find((chart) => chart.id === over.id)
        );

        const draggedItem = chartContainers[sourceContainerIndex].charts.find(
            (chart) => chart.id === active.id
        );

        if (draggedItem && sourceContainerIndex !== destinationContainerIndex) {
            const updatedSourceContainer = {
                ...chartContainers[sourceContainerIndex],
                charts: chartContainers[sourceContainerIndex].charts.filter(
                    (chart) => chart.id !== draggedItem.id
                ),
            };

            const updatedDestinationContainer = {
                ...chartContainers[destinationContainerIndex],
                charts: [
                    ...chartContainers[destinationContainerIndex].charts,
                    draggedItem,
                ],
            };

            const updatedContainers = [...chartContainers];
            updatedContainers[sourceContainerIndex] = updatedSourceContainer;
            updatedContainers[destinationContainerIndex] =
                updatedDestinationContainer;
            setChartContainers(updatedContainers);
        } else {
            // Reorder items within the same container
            const updatedContainers = [...chartContainers];
            const sourceCharts = updatedContainers[sourceContainerIndex].charts;
            const oldIndex = sourceCharts.findIndex(
                (chart) => chart.id === active.id
            );
            const newIndex = sourceCharts.findIndex(
                (chart) => chart.id === over.id
            );

            const reorderedCharts = arrayMove(sourceCharts, oldIndex, newIndex);

            updatedContainers[sourceContainerIndex] = {
                ...updatedContainers[sourceContainerIndex],
                charts: reorderedCharts,
            };

            setChartContainers(updatedContainers);
        }
    };

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
            sensors={sensors}
        >
            <Drag>
                <div className="selection__container">
                    {chartContainers.map((container) => {
                        const [showValues, setShowValues] = useState(false);
                        return (
                            <div className="selection__wrapper">
                                <Accordion>
                                    <AccordionSummary
                                        onClick={() => setShowValues(true)}
                                    >
                                        Category
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {showValues && (
                                            <SortableContext
                                                items={container.charts}
                                                strategy={
                                                    verticalListSortingStrategy
                                                }
                                            >
                                                {container.charts.map(
                                                    (chart) => {
                                                        return (
                                                            <Selection
                                                                key={chart.id}
                                                                id={chart.id}
                                                                name={
                                                                    chart.name
                                                                }
                                                            />
                                                        );
                                                    }
                                                )}
                                            </SortableContext>
                                        )}
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        );
                    })}
                </div>
            </Drag>
        </DndContext>
    );
};

export default DragSection;
