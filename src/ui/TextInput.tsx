import styled from "styled-components";

export const TextInput = styled.input`
  padding: 5px 10px;
  box-shadow: inset 0 0 0 1px
    ${(props: any) =>
      props.error ? props.theme.primaryColor : props.theme.badColor};
  border-radius: 5px;
  border: none;
  outline: none;
  font: inherit;
  background-color: ${props => props.theme.secondaryColor};
  color: ${props => props.theme.textColor};
  max-width: ${(props: any) => props.maxWidth};
  width: 100%;
  text-align: center;
`;
