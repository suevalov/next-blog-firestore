import React from "react";
import { Grid, Row, Col } from "react-styled-flexboxgrid";
import styled from "styled-components";
import Icons from "~/components/Icons";
import SocialLink from "~/components/SocialLink";
import Media from "~/utils/media";
import Config from "~/utils/config";

const Background = styled.section`
  width: 100%;
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.inversedText};
`;

const FooterGrid = styled(Grid)`
  padding-top: 16px;
  padding-bottom: 16px;
  font-size: 12px;
  line-height: 35px;
`;

const FooterSocialLink = SocialLink.extend`
  margin-right: 15px;
  &:last-child {
    margin-right: 0;
  }
`;

const SocialCol = styled(Col)`
  text-align: right;
  ${Media.md`text-align: left`};
`;

export default ({ copyright }) => (
  <Background>
    <FooterGrid>
      <Row style={{ margin: 0 }}>
        <Col xs={10} xsOffset={1} sm={12} smOffset={0} md={6} mdOffset={0}>
          <span>&copy; </span>
          <span>{new Date().getFullYear()} </span>
          <span>{copyright}</span>
        </Col>
        <SocialCol
          xs={10}
          xsOffset={1}
          sm={12}
          smOffset={0}
          md={6}
          mdOffset={0}
        >
          <FooterSocialLink href={Config.social.facebook.href}>
            <Icons.Facebook />
            <span>{Config.social.facebook.title}</span>
          </FooterSocialLink>
          <FooterSocialLink href={Config.social.instagram.href}>
            <Icons.Instagram />
            <span>{Config.social.instagram.title}</span>
          </FooterSocialLink>
          <FooterSocialLink href={Config.social.vimeo.href} size="26px">
            <Icons.Vimeo />
            <span>{Config.social.vimeo.title}</span>
          </FooterSocialLink>
        </SocialCol>
      </Row>
    </FooterGrid>
  </Background>
);
