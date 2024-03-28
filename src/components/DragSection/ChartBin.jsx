import React from "react";
import styled from "styled-components";
import { useDrop } from "react-dnd";
import { Colors } from "@/styles/variables";

const Bin = styled.div`
    height: 100%;
    /* max-width: 300px; */
    flex: 1;
    border: 1px dashed ${Colors.lightGreen};
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ChartBin = ({ item, onDrop }) => {
    const [collectedProps, drop] = useDrop(() => ({
        accept: "Chart",
        drop: onDrop,
    }));
    return <Bin ref={drop}>{item.currValue}</Bin>;
};

export default ChartBin;
