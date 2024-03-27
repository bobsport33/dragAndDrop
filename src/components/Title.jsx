import React from "react";
import styled from "styled-components";

const TitleWrapper = styled.div`
    padding: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = () => {
    return (
        <TitleWrapper>
            <h1>Drag n' Drop</h1>
        </TitleWrapper>
    );
};

export default Title;
