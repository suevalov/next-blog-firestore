import React from "react";
import styled from "styled-components";
import Config from "~/utils/config";
import { Link } from "~/utils/routes";

const LogoBannerContainer = styled.div`
  width: 100%;
  position: relative;
`;

const LogoWrapper = styled.div`
  display: block;
  position: relative;
  width: 30%;
  max-width: 340px;
  padding-top: 120px;
  padding-bottom: 10px;
  margin: 0 auto;

  @media screen and (max-width: ${props =>
      props.theme.flexboxgrid.breakpoints.sm + "em"}) {
    width: 70%;
  }

  @media screen and (min-width: ${props =>
      props.theme.flexboxgrid.breakpoints.sm + "em"}) and (max-width: ${props =>
      props.theme.flexboxgrid.breakpoints.md + "em"}) {
    width: 50%;
  }
`;

const LogoImage = styled.img.attrs({
  src: "/assets/logo.png",
  srcSet: "/assets/logo@2x.png 2x",
  width: "100%",
  alt: `${Config.siteTitle} logo`
})`
  position: absolute;
  left: 0;
  top: 30px;
  width: 100%;
  height: auto;
`;

export default ({ lang }) => (
  <LogoBannerContainer>
    <LogoWrapper>
      <Link route="index" params={{ lang }}>
        <a>
          <LogoImage />
          <div style={{ paddingBottom: "18.76%" }} />
        </a>
      </Link>
    </LogoWrapper>
  </LogoBannerContainer>
);
