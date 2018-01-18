import styled from "styled-components";
import Media from "~/utils/media";
import ExternalLink from "./ExternalLink";

export default styled(ExternalLink)`
  display: inline-flex;
  vertical-align: middle;
  cursor: pointer;
  font-size: ${props => props.size || "30px"};
  color: ${props => props.theme.colors.inversedLink};
  transition: color 0.25s ease-in-out;
  text-decoration: none;

  &:hover,
  &:focus {
    color: ${props => props.theme.colors.inversedLinkHover};
  }

  span {
    display: inline-block;
    margin-left: 5px;
    font-size: 11px;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    ${Media.md`display:none`};
  }
`;
