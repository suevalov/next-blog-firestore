import React from "react";
import styled from "styled-components";
import Icons from "../Icons/index";
import SocialLink from "../SocialLink";
import Links from "~/utils/links";
import PostAuthorAvatar from "./PostAuthorAvatar";

const AuthorBoxContainer = styled.div`
  position: relative;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const AuthorBox = styled.div`
  margin-top: 55px;
  margin-bottom: -5px;
  border-top: 1px solid #ebebeb;
  text-align: center;
  min-height: 150px;
`;

const AuthorInfo = styled.div`
  display: block;
  margin-bottom: 10px;
`;

const AuthorLink = styled(Links.AuthorLink)`
  color: rgba(0, 0, 0, 0.7);
  text-decoration: none;
  font-size: 16px;
  transition: color 0.25s ease;
  &:hover {
    color: ${props => props.theme.colors.inversedLinkHover};
  }
`;

const AuthorDescription = styled.div`
  color: rgba(0, 0, 0, 0.5);
  display: block;
  font-size: 14px;
  margin-top: 10px;
`;

const AuthorSocialLinks = styled.div`
  display: block;
  margin-top: 10px;
`;

const AuthorSocialLink = styled(SocialLink)`
  color: rgba(0, 0, 0, 0.5);
  font-size: 20px;
  margin-right: 5px;
`;

const StyledPostAuthorAvatar = styled(PostAuthorAvatar)`
  margin-top: -60px;
`;

export default ({ author, authorInfo, className }) => {
  return (
    <AuthorBoxContainer className={className}>
      <AuthorBox>
        <AuthorLink author={author}>
          <StyledPostAuthorAvatar
            alt={authorInfo.name}
            src={authorInfo.avatar}
            height={70}
            width={70}
          />
        </AuthorLink>
        <AuthorInfo>
          <AuthorLink author={author}>{authorInfo.name}</AuthorLink>
          {authorInfo.description && (
            <AuthorDescription>{authorInfo.description}</AuthorDescription>
          )}
          <AuthorSocialLinks>
            <AuthorSocialLink href={authorInfo.social.facebook.href}>
              <Icons.Facebook />
            </AuthorSocialLink>
            <AuthorSocialLink href={authorInfo.social.instagram.href}>
              <Icons.Instagram />
            </AuthorSocialLink>
          </AuthorSocialLinks>
        </AuthorInfo>
      </AuthorBox>
    </AuthorBoxContainer>
  );
};
