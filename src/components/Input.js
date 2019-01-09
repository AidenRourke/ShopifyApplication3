import styled from "styled-components";

const Input = styled.input`
  flex: 1 1 auto;
  height: 40px;
  font-size: 16px;
  margin: 10px;
  border-radius: 3px;
  border: 1px solid gray;
  padding: 0 10px;
  :focus{
    outline: none;
  }
`;

export default Input;