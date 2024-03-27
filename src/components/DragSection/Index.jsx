import React, { useState, memo, useCallback } from "react";
import styled from "styled-components";
import update from "immutability-helper";

import Selection from "./Selection";
import KPIBin from "./KPIBin";

const Drag = styled.div`
    min-width: 90vw;
    width: 80%;
    margin: 0 auto;
    border: 1px solid black;
    border-radius: 20px;
    background-color: #f0f0f0;

    padding: 20px;
    display: flex;

    align-items: center;
    gap: 30px;

    .bin {
        &__kpi-container {
            width: 80%;
            height: 100%;
        }
        &__kpi-row {
            display: flex;
            gap: 15px;
            height: 200px;
            width: 100%;
        }
    }

    .box__row {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 20%;
        height: 100%;
    }
`;

const DragSection = memo(({ kpiOptions }) => {
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

    const handleDrop = useCallback(
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

    return (
        <Drag>
            <div className="box__row">
                {kpiOptions &&
                    kpiOptions.map((option, index) => {
                        return (
                            <Selection
                                key={index}
                                kpiValues={kpiValues}
                                setKpiValues={setKpiValues}
                                text={option}
                            />
                        );
                    })}
            </div>
            <div className="bin__kpi-container">
                <div className="bin__kpi-row">
                    {kpiValues.map((item, index) => {
                        return (
                            <KPIBin
                                key={index}
                                item={item}
                                onDrop={(item) => handleDrop(index, item)}
                            />
                        );
                    })}
                </div>
            </div>
        </Drag>
    );
});

export default DragSection;