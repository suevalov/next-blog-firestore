import React from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import LazyLoad from "react-lazyload";

const PlayerContainer = styled.div`
  display: block;
  margin-bottom: 26px;
  background-color: black;
`;

const Player = ({ url, width, lazy, height, offset, ...restProps }) => (
  <PlayerContainer style={{ width, height }}>
    {lazy && (
      <LazyLoad height={height} offset={offset} once>
        <ReactPlayer url={url} width={width} height={height} {...restProps} />
      </LazyLoad>
    )}
    {!lazy && (
      <ReactPlayer url={url} width={width} height={height} {...restProps} />
    )}
  </PlayerContainer>
);

Player.defaultProps = {
  lazy: true,
  width: "100%",
  height: "360px",
  offset: 200
};

export default Player;
