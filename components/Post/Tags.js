import React from "react";
import styled from "styled-components";
import { TagLink } from "~/utils/links";

const TagsContainer = styled.div`
  margin-bottom: 26px;
`;

export const Tag = styled(TagLink)`
  display: inline-block;
  margin-top: 8px;
  margin-right: 8px;
  padding: 6px 18px;
  border: 1px solid #ebebeb;
  color: #454545;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.095em;
  line-height: 1.5;
  text-transform: uppercase;
  text-decoration: none;
  transition: color 0.25s ease;

  &:hover {
    color: ${props => props.theme.colors.inversedLinkHover};
  }
`;

export default ({ tags }) => (
  <TagsContainer>
    {tags.map(tag => (
      <Tag tag={tag} key={tag}>
        #{tag}
      </Tag>
    ))}
  </TagsContainer>
);
