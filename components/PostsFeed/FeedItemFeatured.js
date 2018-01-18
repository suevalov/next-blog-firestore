import React from "react";
import styled from "styled-components";
import { clearFix } from "polished";
import { PostLink } from "~/utils/links";
import CategoryLink from "~/components/CategoryLink";
import FeedItemImage from "./FeedItemImage";

const FeedItemContainer = styled.div`
  display: block;
  ${clearFix()};
  margin-left: -15px;
  margin-right: -15px;
  box-sizing: border-box;

  @media screen and (max-width: ${props =>
      props.theme.flexboxgrid.breakpoints.sm + "em"}) {
    margin-left: 0;
    margin-right: 0;
  }
`;

const ImageColumn = styled.div`
  width: 45%;
  float: ${props => (props.even ? "right" : "left")};
  padding-left: 15px;
  padding-right: 15px;
  box-sizing: border-box;

  @media screen and (max-width: ${props =>
      props.theme.flexboxgrid.breakpoints.sm + "em"}) {
    width: 100%;
    float: left;
    padding-left: 0;
    padding-right: 0;
  }
`;

const DescriptionColumn = styled.div`
  width: 55%;
  float: left;

  @media screen and (max-width: ${props =>
      props.theme.flexboxgrid.breakpoints.sm + "em"}) {
    width: 100%;
  }
`;

const DescriptionColumnInner = styled.div`
  display: block;
  padding-left: 15px;
  padding-right: 15px;

  p {
    line-height: 1.8em;
    font-size: 14px;
  }

  @media screen and (max-width: ${props =>
      props.theme.flexboxgrid.breakpoints.sm + "em"}) {
    padding-top: 20px;
    >  {
      padding-left: 35px;
      padding-right: 35px;
    }
  }
`;

const PostTitleLink = styled(PostLink)`
  font-size: 24px;
  font-weight: 400;
  margin-top: 10px;
  display: block;
  text-decoration: none;
  color: #000;

  &:hover {
    text-decoration: underline;
  }
`;

function FeedItem(props) {
  return (
    <FeedItemContainer>
      <ImageColumn even={props.even}>
        <PostLink href={props.href}>
          <FeedItemImage featured src={props.image} lazy={props.lazy} />
          <span style={{ display: "none" }}>{props.title}</span>
        </PostLink>
      </ImageColumn>
      <DescriptionColumn>
        <DescriptionColumnInner>
          <CategoryLink category={props.category}>
            {props.category}
          </CategoryLink>
          <PostTitleLink prefetch href={props.href}>
            {props.title}
          </PostTitleLink>
          {props.text && <p>{props.text}</p>}
        </DescriptionColumnInner>
      </DescriptionColumn>
    </FeedItemContainer>
  );
}

export default FeedItem;
