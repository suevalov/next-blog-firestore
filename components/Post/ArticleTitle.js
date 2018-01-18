import React from "react";
import styled from "styled-components";
import tinytime from "tinytime";
import Links from "~/utils/links";
import Image from "./Image";
import Player from "../Player";
import PostAuthorAvatar from "./PostAuthorAvatar";

const template = tinytime("{DD} {MMMM}, {YYYY}");

const MetaContainerDivider = styled.div`
  margin-top: 40px;
  height: 1px;
  border-top: 1px solid #ebebeb;
`;

const MetaContainer = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #fff;
  margin-top: -33px;
  padding: 0 20px;
`;

const MetaContainerText = styled.div`
  text-align: left;
  line-height: 20px;
  font-size: 14px;

  span {
    color: rgba(0, 0, 0, 0.5);
  }
`;

const SimpleTitleContainer = styled.div`
  margin-bottom: 26px;
  text-align: center;

  h1 {
    display: inline-block;
    font-size: 36px;
    font-weight: 400;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 10px;
  }

  .image {
    margin-bottom: 26px;
  }

  .video {
    margin-bottom: 26px;
  }
`;

const ArticleTitleAuthorAvatar = styled(PostAuthorAvatar)`
  border-top-width: 5px;
  border-bottom-width: 5px;
  border-left-width: 0px;
`;

const ArticleTitleAuthorLink = styled(Links.AuthorLink)`
  color: rgba(0, 0, 0, 0.7);
  text-decoration: none;
  transition: color 0.25s ease;
  &:hover {
    color: ${props => props.theme.colors.inversedLinkHover};
  }
`;

export default ({
  title,
  date,
  category,
  image,
  imageHeight,
  imageWidth,
  video,
  author,
  authorInfo
}) => (
  <SimpleTitleContainer>
    {image && (
      <div className="image">
        <Image
          src={image}
          width={imageWidth}
          height={imageHeight}
          lazy={false}
        />
      </div>
    )}
    {video && (
      <div className="video">
        <Player url={video} width="100%" height="60vh" lazy={false} />
      </div>
    )}
    <div>
      <MetaContainerDivider />
      <MetaContainer>
        <Links.AuthorLink author={author}>
          <ArticleTitleAuthorAvatar
            alt={authorInfo.name}
            src={authorInfo.avatar}
            width={50}
            height={50}
          />
        </Links.AuthorLink>
        <MetaContainerText>
          <div>
            <ArticleTitleAuthorLink author={author}>
              {authorInfo.name}
            </ArticleTitleAuthorLink>
          </div>
          <div>
            <span>{template.render(new Date(date))}</span>
          </div>
        </MetaContainerText>
      </MetaContainer>
    </div>
    <h1>{title}</h1>
  </SimpleTitleContainer>
);
