import React from "react";
import styled from "styled-components";
import Media from "~/utils/media";

const InstagramGridContainer = styled.div`
  height: 261px;
  position: relative;
  overflow: hidden;

  ${Media.lg`
    height: 205px;
  `};
`;

export default () => (
  <InstagramGridContainer>
    <iframe
      title="Instagram Grid"
      src="https://snapwidget.com/embed/408764"
      className="snapwidget-widget"
      allowTransparency="true"
      frameBorder="0"
      scrolling="no"
      style={{
        border: "none",
        width: "100%",
        height: "100%"
      }}
    />
  </InstagramGridContainer>
);
