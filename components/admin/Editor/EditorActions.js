import React from "react";
import { Button, Menu, Dropdown } from "antd";
import { EditorMode, EditorStatus } from "./constants";

export const EditorActionType = {
  PUBLISH: "publish",
  DELETE_DRAFT: "delete_draft",
  DISCARD_DRAFT_CHANGES: "discard_draft_changes",
  UNPUBLISH: "unpublish",
  UPDATE: "update",
  TOGGLE_MODE: "toggle_mode",
  SAVE_CHANGES: "save_changes",
  CREATE_COPY: "create_copy"
};

export default class EditorActionTypeEditorActions extends React.Component {
  onHandleMenuClick = e => {
    this.props.onAction(e.key);
  };

  onPublish = () => {
    this.props.onAction(EditorActionType.PUBLISH);
  };

  onUpdate = () => {
    this.props.onAction(EditorActionType.UPDATE);
  };

  onToggleMode = () => {
    this.props.onAction(EditorActionType.TOGGLE_MODE);
  };

  onSaveChanges = () => {
    this.props.onAction(EditorActionType.SAVE_CHANGES);
  };

  render() {
    if (this.props.editorMode === EditorMode.EDIT_SETTINGS) {
      return (
        <Button.Group style={{ marginLeft: 10 }}>
          <Button
            icon="left"
            type="default"
            size="large"
            onClick={this.onToggleMode}
          >
            Back
          </Button>
        </Button.Group>
      );
    }

    const settingsBtn = (
      <Button.Group style={{ marginLeft: 10 }}>
        <Button
          icon="setting"
          type="default"
          size="large"
          onClick={this.onToggleMode}
        >
          Settings
        </Button>
      </Button.Group>
    );

    if (this.props.editorStatus !== EditorStatus.SAVED) {
      return (
        <div>
          <Button.Group>
            <Button size="large" type="primary" onClick={this.onSaveChanges}>
              Save Changes
            </Button>
          </Button.Group>
          {settingsBtn}
        </div>
      );
    }

    if (!this.props.isPublished) {
      const overlay = (
        <Menu onClick={this.onHandleMenuClick}>
          <Menu.Item key={EditorActionType.CREATE_COPY}>Create copy</Menu.Item>
          <Menu.Item key={EditorActionType.DELETE_DRAFT}>
            Delete draft
          </Menu.Item>
        </Menu>
      );

      return (
        <div>
          <Dropdown.Button
            size="large"
            type="primary"
            overlay={overlay}
            onClick={this.onPublish}
          >
            Publish
          </Dropdown.Button>
          {settingsBtn}
        </div>
      );
    }

    const overlay = (
      <Menu onClick={this.onHandleMenuClick}>
        <Menu.Item key={EditorActionType.CREATE_COPY}>Create copy</Menu.Item>
        <Menu.Item key={EditorActionType.DISCARD_DRAFT_CHANGES}>
          Discard changes
        </Menu.Item>
        <Menu.Item key={EditorActionType.UNPUBLISH}>Unpublish</Menu.Item>
      </Menu>
    );

    return (
      <div>
        <Dropdown.Button
          size="large"
          type="primary"
          overlay={overlay}
          onClick={this.onUpdate}
        >
          Update
        </Dropdown.Button>
        {settingsBtn}
      </div>
    );
  }
}
