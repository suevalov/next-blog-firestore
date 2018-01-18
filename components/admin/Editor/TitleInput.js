import React from "react";
import styled from "styled-components";
import { Input } from "antd";

const StyledInput = styled.div`
  margin-bottom: 20px;

  input {
    display: inline-block;
    padding: 0;
    width: 100%;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
    background-image: none;
    border: none !important;
    resize: none;
    height: 50px;
    z-index: auto;
    position: relative;
    line-height: 36px;
    font-size: 32px;
    transition: none;
    background: transparent !important;

    :hover,
    :focus {
      outline: 0;
      box-shadow: none;
    }
  }
`;

export default class TitleInput extends React.Component {
  onKeyDown = event => {
    if (event.metaKey) {
      if (event.keyCode === 83) {
        event.preventDefault();
        event.stopPropagation();
        this.props.onSave();
      }
    }
  };

  render() {
    const { onSave, ...restProps } = this.props;
    return (
      <StyledInput>
        <Input {...restProps} onKeyDown={this.onKeyDown} />
      </StyledInput>
    );
  }
}
