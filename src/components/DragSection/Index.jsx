import React, { useState } from "react";
import styled from "styled-components";
import { DndContext, closestCenter } from "@dnd-kit/core";

import Selection from "./Selection";
import DropContainer from "./DropContainer";
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
    const [containers, setContainers] = useState([
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
    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            return;
        }

        const sourceContainerIndex = containers.findIndex((container) =>
            container.charts.find((chart) => chart.id === active.id)
        );
        const destinationContainerIndex = containers.findIndex((container) =>
            container.charts.find((chart) => chart.id === over.id)
        );

        const draggedItem = containers[sourceContainerIndex].charts.find(
            (chart) => chart.id === active.id
        );

        if (draggedItem && sourceContainerIndex !== destinationContainerIndex) {
            const updatedSourceContainer = {
                ...containers[sourceContainerIndex],
                charts: containers[sourceContainerIndex].charts.filter(
                    (chart) => chart.id !== draggedItem.id
                ),
            };

            const updatedDestinationContainer = {
                ...containers[destinationContainerIndex],
                charts: [
                    ...containers[destinationContainerIndex].charts,
                    draggedItem,
                ],
            };

            const updatedContainers = [...containers];
            updatedContainers[sourceContainerIndex] = updatedSourceContainer;
            updatedContainers[destinationContainerIndex] =
                updatedDestinationContainer;
            setContainers(updatedContainers);
        } else {
            // Reorder items within the same container
            const updatedContainers = [...containers];
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

            setContainers(updatedContainers);
        }
    };

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <Drag>
                <div className="selection__container">
                    {containers.map((container) => {
                        return (
                            <div className="selection__wrapper">
                                <SortableContext
                                    items={container.charts}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {container.charts.map((chart) => {
                                        return (
                                            <Selection
                                                key={chart.id}
                                                id={chart.id}
                                                name={chart.name}
                                            />
                                        );
                                    })}
                                </SortableContext>
                            </div>
                        );
                    })}
                </div>
            </Drag>
        </DndContext>
    );
};

export default DragSection;
