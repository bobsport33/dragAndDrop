import React from "react";
import styled from "styled-components";
import { useDroppable } from "@dnd-kit/core";

const Container = styled.div`
    height: 300px;
    width: 300px;
    border: 1px dashed black;
    border-radius: 15px;
`;

const DropContainer = ({ id }) => {
    const { isOver, setNodeRef } = useDroppable({
        id: id,
    });
    return <Container ref={setNodeRef}></Container>;
};

export default DropContainer;
