import React from "react";
import styled, { keyframes, css } from "styled-components";

const spin = keyframes`
  0%   { 
    -webkit-transform: rotate(0deg);  /* Chrome, Opera 15+, Safari 3.1+ */
    -ms-transform: rotate(0deg);  /* IE 9 */
    transform: rotate(0deg);  /* Firefox 16+, IE 10+, Opera */
  }
  100% {
    -webkit-transform: rotate(360deg);  /* Chrome, Opera 15+, Safari 3.1+ */
    -ms-transform: rotate(360deg);  /* IE 9 */
    transform: rotate(360deg);  /* Firefox 16+, IE 10+, Opera */
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;

  ${props =>
    props.loaded
      ? css`
          visibility: hidden;

          -webkit-transform: translateY(
            -100%
          ); /* Chrome, Opera 15+, Safari 3.1+ */
          -ms-transform: translateY(-100%); /* IE 9 */
          transform: translateY(-100%); /* Firefox 16+, IE 10+, Opera */

          -webkit-transition: all 0.3s 1s ease-out;
          transition: all 0.3s 1s ease-out;
        `
      : ``};
`;

const Section = styled.div`
  position: fixed;
  top: 0;
  width: 51%;
  height: 100%;
  background: #222222;
  z-index: 1000;
  -webkit-transform: translateX(0); /* Chrome, Opera 15+, Safari 3.1+ */
  -ms-transform: translateX(0); /* IE 9 */
  transform: translateX(0); /* Firefox 16+, IE 10+, Opera */
`;

const Loader = styled.div`
  display: block;
  position: relative;
  left: 50%;
  top: 50%;
  width: 150px;
  height: 150px;
  margin: -75px 0 0 -75px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #3498db;

  -webkit-animation: ${spin} 2s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
  animation: ${spin} 2s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
  z-index: 1001;

  &:before {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #e74c3c;

    -webkit-animation: ${spin} 3s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
    animation: ${spin} 3s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
  }

  &:after {
    content: "";
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #f9c922;

    -webkit-animation: ${spin} 1.5s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
    animation: ${spin} 1.5s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
  }

  ${props =>
    props.loaded
      ? css`
          opacity: 0;
          -webkit-transition: all 0.3s ease-out;
          transition: all 0.3s ease-out;
        `
      : ``};
`;

const LeftSection = Section.extend`
  left: 0;
  ${props =>
    // @ts-ignore
    props.loaded
      ? css`
          -webkit-transform: translateX(
            -100%
          ); /* Chrome, Opera 15+, Safari 3.1+ */
          -ms-transform: translateX(-100%); /* IE 9 */
          transform: translateX(-100%); /* Firefox 16+, IE 10+, Opera */

          -webkit-transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
          transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        `
      : ``};
`;

const RightSection = Section.extend`
  right: 0;
  ${props =>
    // @ts-ignore
    props.loaded
      ? css`
          -webkit-transform: translateX(
            100%
          ); /* Chrome, Opera 15+, Safari 3.1+ */
          -ms-transform: translateX(100%); /* IE 9 */
          transform: translateX(100%); /* Firefox 16+, IE 10+, Opera */

          -webkit-transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
          transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        `
      : ``};
`;

function SplashLoader({ loaded }) {
  return (
    <Container loaded={loaded}>
      <Loader loaded={loaded} />
      <LeftSection loaded={loaded} />
      <RightSection loaded={loaded} />
    </Container>
  );
}

SplashLoader.defaultProps = {
  loaded: false
};

export default SplashLoader;
