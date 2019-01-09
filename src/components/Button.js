import React from "react";
import styled from "styled-components";


const StyledButton = styled.span`
  display: inline-block;
  background-color: #4B9662;
  box-shadow: 0 8px 6px -6px gray;
  padding: 10px;
  height: 20px;
  width: 20px;
  border-radius: 3px;
  cursor: pointer;
  transform: scaleX(-1);
  border: 1px solid transparent;
  :hover{
    opacity: 0.9;
  }
`;

const Button = (props) => {
    return <StyledButton {...props}/>
}

export default Button;