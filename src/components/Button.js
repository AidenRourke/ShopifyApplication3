import styled from "styled-components";


const Button = styled.span`
  display: inline-block;
  background-color: #4B9662;
  box-shadow: 0 8px 6px -6px gray;
  margin: 10px;
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

export default Button;