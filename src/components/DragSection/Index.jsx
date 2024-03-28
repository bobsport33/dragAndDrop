import React, { useState, memo, useCallback } from "react";
import styled from "styled-components";

import Selection from "./Selection";
import KPIBin from "./KPIBin";
import ChartBin from "./ChartBin";
import Button from "../Button/Index";
import { Colors } from "@/styles/variables";

const Drag = styled.div`
    min-width: 90vw;
    width: 80%;
    margin: 0 auto;

    border-radius: 20px;
    background-color: ${Colors.darkGreen};
    color: ${Colors.lightGreen};
    padding: 20px;
    display: flex;

    align-items: flex-start;
    gap: 30px;

    .selection {
        &__container {
            width: 20%;
            height: 100%;
            display: flex;
            flex-direction: column;
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
`;

const DragSection = memo(({ kpiOptions, chartOptions }) => {
    const [kpiValues, setKpiValues] = useState([
        { name: "KPI1", currValue: "" },
        { name: "KPI2", currValue: "" },
        { name: "KPI3", currValue: "" },
        { name: "KPI4", currValue: "" },
        { name: "KPI5", currValue: "" },
    ]);

    const [chartValues, setChartValues] = useState([
        { name: "chart1", currValue: "" },
        { name: "chart2", currValue: "" },
    ]);

    const handleKPIDrop = useCallback(
        (index, item) => {
            setKpiValues((prevKpiValues) => {
                return prevKpiValues.map((value, i) => {
                    if (i === index) {
                        return { name: value.name, currValue: item.text };
                    }
                    return value;
                });
            });
        },
        [setKpiValues]
    );

    const handleChartDrop = useCallback(
        (index, item) => {
            setChartValues((prevKpiValues) => {
                return prevKpiValues.map((value, i) => {
                    if (i === index) {
                        return { name: value.name, currValue: item.text };
                    }
                    return value;
                });
            });
        },
        [setChartValues]
    );

    const submitHandler = () => {
        console.log("KPIs", kpiValues);
        console.log("Charts", chartValues);
    };
    return (
        <Drag>
            <div className="selection__container">
                <h3 className="selection__title">KPIs</h3>
                <div className="selection__column">
                    {kpiOptions &&
                        kpiOptions.map((option, index) => {
                            return (
                                <Selection
                                    key={index}
                                    type="KPI"
                                    text={option}
                                />
                            );
                        })}
                </div>
                <h3 className="selection__title">Charts</h3>
                <div className="selection__column">
                    {chartOptions &&
                        chartOptions.map((option, index) => {
                            return (
                                <Selection
                                    key={index}
                                    type="Chart"
                                    text={option}
                                />
                            );
                        })}
                </div>
            </div>
            <div className="bin__container">
                <div className="bin__kpi-container">
                    <div className="bin__kpi-row">
                        {kpiValues.map((item, index) => {
                            return (
                                <KPIBin
                                    key={index}
                                    item={item}
                                    onDrop={(item) =>
                                        handleKPIDrop(index, item)
                                    }
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="bin__chart-container">
                    {chartValues.map((item, index) => {
                        return (
                            <ChartBin
                                key={index}
                                item={item}
                                onDrop={(item) => {
                                    handleChartDrop(index, item);
                                }}
                            />
                        );
                    })}
                </div>
                <Button text="Save" onClick={submitHandler} />
            </div>
        </Drag>
    );
});

export default DragSection;
