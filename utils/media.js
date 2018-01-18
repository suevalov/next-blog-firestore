import keys from "lodash.keys";
import { css } from "styled-components";
import theme from "./theme";

export const sizes = theme.flexboxgrid.breakpoints;

// Iterate through the sizes and create a media template
const media = keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}em) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

export default media;
