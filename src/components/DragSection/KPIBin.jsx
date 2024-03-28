import React, { memo } from "react";
import styled from "styled-components";

import { useDrop } from "react-dnd";
import { Colors } from "@/styles/variables";

const BinContainer = styled.div`
    height: 100%;
    max-width: 300px;
    flex: 1;
    border: 1px dashed ${Colors.lightGreen};
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const KPIBin = memo(({ item, onDrop }) => {
    const [collectedProps, drop] = useDrop(() => ({
        accept: "KPI",
        drop: onDrop,
    }));

    return <BinContainer ref={drop}>{item.currValue}</BinContainer>;
});

export default KPIBin;
