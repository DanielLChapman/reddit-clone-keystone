import React from 'react';
import styled from 'styled-components';

export const DropDown = styled.div`
        background: transparent;
        width: 25vw;
        top:35px;
        border:1px solid black;
        position:absolute;
        left: 40px;
    `;

export const DropDownItem = styled.div`
    border-bottom: 1px solid lightgray;
    background: ${(props) => (props.highlighted ? '#f7f7f7' : 'white')};
    padding: .5rem;
    transition: all 0.2s;
    ${(props) => (props.highlighted ? 'padding-left: 2rem;' : null)};
    display: flex;
    align-items: center;
    font-size: .95rem;
    border-left: 10px solid
    ${(props) => (props.highlighted ? 'lightgray' : 'white')};
`;
