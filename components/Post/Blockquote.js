import React from "react";
import styled from "styled-components";

const StyledBlockquote = styled.blockquote`
  padding: 20px 20px;
  padding-left: 20px;
  margin: 0;
  margin-bottom: 26px;
  color: rgba(0, 0, 0, 0.75);
  border-left: 5px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(0, 0, 0, 0.03);
  font-size: ${props => `${props.size}px`};
`;

StyledBlockquote.defaultProps = {
  size: 18
};

const StyledCite = styled.cite`
  display: block;
  padding-top: 20px;
  font-size: ${props => `${props.size - 2}px`};
  font-style: italic;
  color: rgba(0, 0, 0, 0.55);
`;

StyledCite.defaultProps = {
  size: 18
};

export default ({ children, who, size }) => (
  <StyledBlockquote size={size}>
    {children}
    {who && <StyledCite size={size}>- {who}</StyledCite>}
  </StyledBlockquote>
);
