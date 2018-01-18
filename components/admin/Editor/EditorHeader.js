import React, { Component } from "react";
import styled from "styled-components";
import EditorStatus from "./EditorStatus";
import EditorActions from "./EditorActions";

const EditorHeaderContainer = styled.header`
  align-items: center;
  display: flex;
  height: 80px;
  justify-content: space-between;
  left: 0;
  padding: 0 30px;
  position: absolute;
  right: 0;
  top: 0;
  background-color: #fff;
  z-index: 99;
`;

export default class EditorHeader extends Component {
  render() {
    return (
      <EditorHeaderContainer>
        <EditorStatus status={this.props.editorStatus} />
        <EditorActions
          editorStatus={this.props.editorStatus}
          editorMode={this.props.editorMode}
          isPublished={this.props.isPublished}
          onAction={this.props.onAction}
        />
      </EditorHeaderContainer>
    );
  }
}
