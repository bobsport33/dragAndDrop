import React from "react";
import { styled } from "@mui/material";
import { SortableContext } from "@dnd-kit/sortable";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TaskCard from "./TaskCard";
const AccordionContainer = styled("div")`
    border: 1px solid black;

    .accordion {
        &__selection-summary {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        &__category-title {
            font-size: 1.3rem;
        }
    }
`;

const SelectionAccordion = ({ title, defaultIds, selections, type }) => {
    return (
        <AccordionContainer>
            <Accordion>
                <AccordionSummary className="accordion__selection-summary">
                    <h5 className="accordion__category-title">{title}</h5>
                    <ArrowDropDownIcon />
                </AccordionSummary>
                <AccordionDetails>
                    {defaultIds && (
                        <SortableContext items={defaultIds}>
                            {selections
                                .filter((task) => {
                                    return task.columnId === "";
                                })
                                .map((task) => {
                                    return (
                                        <TaskCard
                                            key={task.id}
                                            task={task}
                                            type={type}
                                        />
                                    );
                                })}
                        </SortableContext>
                    )}
                </AccordionDetails>
            </Accordion>
        </AccordionContainer>
    );
};

export default SelectionAccordion;
