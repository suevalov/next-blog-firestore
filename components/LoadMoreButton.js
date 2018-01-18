import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  margin: 10px 0 20px 0;
  text-align: center;
`;

const Button = styled.button`
  display: inline-block;
  margin-top: 0px;
  margin-bottom: 10px;
  padding: 16px 48px;
  border: 1px solid #ebebeb;
  color: #454545;
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 400;
  letter-spacing: 0.095em;
  text-decoration: none;
  transition: all 0.25s ease;
  cursor: pointer;
  outline: none;

  &:hover,
  &:focus {
    color: ${props => props.theme.colors.inversedLinkHover};
  }
`;

export default ({ title, onClick }) => (
  <ButtonContainer>
    <Button onClick={onClick}>{title}</Button>
  </ButtonContainer>
);
