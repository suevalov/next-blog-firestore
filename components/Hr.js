import React from "react";
import styled from "styled-components";
import { clearFix } from "polished";

const Container = styled.div`
  ${clearFix()};
`;

const Hr = styled.hr`
  position: relative;
  margin: 45px 0px;
  border: none;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);

  &:before {
    content: "";
    display: inline-block;
    background: url(/assets/delimeter.svg) 21px center no-repeat;
    width: 117px;
    height: 25px;
    background-size: 90px;
    position: absolute;
    left: 0;
    right: 0;
    top: -12px;
    margin: auto;
    background-color: #ffffff;
  }
`;

export default () => (
  <div>
    <Container />
    <Hr />
  </div>
);
