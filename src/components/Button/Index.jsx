import { Colors } from "@/styles/variables";
import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.button`
    font-size: 1.2rem;
    border: 1px solid ${Colors.green};
    background-color: ${Colors.darkGreen};
    color: ${Colors.lightGreen};
    padding: 10px 20px;
    border-radius: 10px;
`;

const Button = ({ text, onClick }) => {
    return <ButtonContainer onClick={onClick}>{text}</ButtonContainer>;
};

export default Button;
