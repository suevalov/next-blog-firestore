import React from "react";
import styled from "styled-components";
import { ShareButtons, ShareCounts, generateShareIcon } from "react-share";

const {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  VKShareButton,
  OKShareButton,
  TelegramShareButton
} = ShareButtons;

const {
  FacebookShareCount,
  GooglePlusShareCount,
  VKShareCount,
  OKShareCount
} = ShareCounts;

const FacebookIcon = generateShareIcon("facebook");
const TwitterIcon = generateShareIcon("twitter");
const GooglePlusIcon = generateShareIcon("google");
const VKIcon = generateShareIcon("vk");
const OKIcon = generateShareIcon("ok");
const TelegramIcon = generateShareIcon("telegram");

const SocialButtonsContainer = styled.div`
  display: inline-block;
  min-height: 50px;
`;

const SocialButton = styled.div`
  float: left;
  margin-right: 10px;
  text-align: center;
  cursor: pointer;

  .SocialMediaShareButton:focus {
    outline: none;
  }

  .count {
    font-size: 14px;
    margin-top: 2px;
    color: rgba(0, 0, 0, 0.5);
  }
`;

class SocialButtons extends React.Component {
  render() {
    const shareUrl = `${window.location.origin}${this.props.url}`;
    return (
      <SocialButtonsContainer>
        <SocialButton>
          <FacebookShareButton url={shareUrl} quote={this.props.title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <FacebookShareCount url={shareUrl} className="count">
            {count => count}
          </FacebookShareCount>
        </SocialButton>
        <SocialButton>
          <GooglePlusShareButton url={shareUrl}>
            <GooglePlusIcon size={32} round />
          </GooglePlusShareButton>

          <GooglePlusShareCount url={shareUrl} className="count">
            {count => count}
          </GooglePlusShareCount>
        </SocialButton>
        <SocialButton>
          <VKShareButton url={shareUrl} windowWidth={660} windowHeight={460}>
            <VKIcon size={32} round />
          </VKShareButton>

          <VKShareCount url={shareUrl} className="count" />
        </SocialButton>
        <SocialButton>
          <OKShareButton url={shareUrl} windowWidth={660} windowHeight={460}>
            <OKIcon size={32} round />
          </OKShareButton>

          <OKShareCount url={shareUrl} className="count" />
        </SocialButton>
        <SocialButton>
          <TwitterShareButton url={shareUrl} title={this.props.title}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </SocialButton>
        <SocialButton>
          <TelegramShareButton url={shareUrl} title={this.props.title}>
            <TelegramIcon size={32} round />
          </TelegramShareButton>
        </SocialButton>
      </SocialButtonsContainer>
    );
  }
}

export default SocialButtons;
