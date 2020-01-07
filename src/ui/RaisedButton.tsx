import styled from "styled-components";

export const RaisedButton = styled("button")`
  height: 51px;
  padding: 6px 16px;
  font-weight: 500;
  background: #ff3232;
  font-size: 16px;
  color: #ffffff;
  border: 1px solid #ffffff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
