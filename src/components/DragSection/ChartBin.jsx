import React from "react";
import styled from "styled-components";
import { useDrop } from "react-dnd";

const Bin = styled.div`
    height: 100%;
    /* max-width: 300px; */
    flex: 1;
    border: 1px dashed black;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ChartBin = ({ onDrop }) => {
    const [collectedProps, drop] = useDrop(() => ({
        accept: "Chart",
        drop: onDrop,
    }));
    return <Bin ref={drop}></Bin>;
};

export default ChartBin;
