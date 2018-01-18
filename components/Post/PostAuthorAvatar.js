import React from "react";
import styled from "styled-components";
import Icons from "~/components/Icons";

const AuthorAvatar = styled.div`
  position: relative;
  display: inline-block;
  border: 22px solid #fff;

  svg {
    fill: #ebebeb;
    width: ${props => props.width + 20}px;
    height: ${props => props.height + 20}px;
    top: -10px;
    left: -10px;
    transition: all 0.25s ease;
    position: absolute;
  }

  &:hover {
    svg {
      fill: ${props => props.theme.colors.inversedLinkHover};
      transform: rotate(90deg);
    }
  }

  img {
    display: inline-block;
    border-radius: 50%;
  }
`;

export default ({ src, width, height, alt, className }) => (
  <AuthorAvatar height={height} width={width} className={className}>
    <img alt={alt} src={src} height={height} width={width} />
    <Icons.Avatar />
  </AuthorAvatar>
);
