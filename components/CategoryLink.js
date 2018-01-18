import styled from "styled-components";
import { CategoryLink } from "~/utils/links";

export default styled(CategoryLink)`
  display: inline-block;
  text-transform: uppercase;
  font-size: 12px;
  cursor: pointer;
  transition: color 0.25s ease;
  text-decoration: underline;
  color: ${props => props.theme.colors.black};

  &:hover,
  &:focus,
  &:visited {
    color: ${props => props.theme.colors.text};
    text-decoration: underline;
    transition: color 0.25s ease;
  }

  &:hover {
    color: ${props => props.theme.colors.inversedLinkHover};
  }
`;
