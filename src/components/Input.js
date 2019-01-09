import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  flex: 1 1 auto;
  height: 40px;
  font-size: 16px;
  border-radius: 3px;
  border: 1px solid gray;
  padding: 0 10px;
  :focus {
    outline: none;
  }
`;

const Input = (props) => {
    return <StyledInput {...props}/>
};

export default Input;