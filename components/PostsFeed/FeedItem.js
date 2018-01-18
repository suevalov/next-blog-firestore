import React from "react";
import styled from "styled-components";
import { PostLink } from "~/utils/links";
import CategoryLink from "~/components/CategoryLink";
import FeedItemImage from "./FeedItemImage";

const FeedItemContainer = styled.div`
  display: block;
  width: 100%;
  text-align: center;
`;

const CategoryLinkWrapper = styled.div`
  margin-top: 10px;
`;

const ItemTitle = styled(PostLink)`
  font-size: 15px;
  font-weight: 400;
  margin-top: 10px;
  padding-right: 10px;
  padding-left: 10px;
  display: block;
  text-decoration: none;
  color: ${props => props.theme.colors.black};

  &:hover {
    text-decoration: underline;
  }
`;

function FeedItem(props) {
  return (
    <FeedItemContainer>
      <PostLink href={props.href}>
        <FeedItemImage src={props.image} lazy={props.lazy} />
        <span style={{ display: "none" }}>{props.title}</span>
      </PostLink>
      <CategoryLinkWrapper>
        <CategoryLink category={props.category}>{props.category}</CategoryLink>
      </CategoryLinkWrapper>
      <ItemTitle href={props.href}>{props.title}</ItemTitle>
    </FeedItemContainer>
  );
}

export default FeedItem;
