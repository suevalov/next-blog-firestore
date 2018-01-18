import React from "react";
import styled from "styled-components";
import ScrollUp from "react-scroll-up";
import Icons from "./Icons";
import Theme from "~/utils/theme";
import Media from "~/utils/media";

const StyledArrowUp = styled(Icons.ArrowUp)`
  display: inline-block;
  font-size: 40px;
  ${Media.sm`display: none`};
`;

export default ({ showUnder }) => (
  <ScrollUp
    showUnder={showUnder || 150}
    style={{ right: 20, bottom: 12, color: Theme.colors.black }}
  >
    <StyledArrowUp />
  </ScrollUp>
);
