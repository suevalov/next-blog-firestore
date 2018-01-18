import React from "react";
import debounce from "lodash.debounce";
import SimpleMDE from "./SimpleMDE";
import EditorContainer from "./EditorContainer";
import EditorMainSection from "./EditorMainSection";
import TitleInput from "./TitleInput";
import ToolbarHack from "./ToolbarHack";
import EditorHeader from "./EditorHeader";
import MetaEditor from "./MetaEditor";
import { Modal } from "antd";
import { EditorStatus, EditorMode } from "./constants";
import { EditorActionType } from "./EditorActions";

export class StoryEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: "",
      meta: {},
      isPublished: false,
      editorMode: EditorMode.EDIT_TEXT,
      editorStatus:
        props.initialValues && props.initialValues.id
          ? EditorStatus.SAVED
          : EditorStatus.UNSAVED,
      touched: false,
      ...props.initialValues
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.initialValues &&
      (nextProps.initialValues.id !== this.props.initialValues.id ||
        nextProps.initialValues.isPublished !== this.props.isPublished)
    ) {
      this.setState({
        ...nextProps.initialValues,
        editorStatus: EditorStatus.SAVED
      });
    }
  }

  onChangeTitle = event => {
    const title = event.target.value;
    this.setState(state => {
      const touched = state.title !== title;
      return {
        title,
        touched,
        editorStatus: touched ? EditorStatus.UNSAVED : state.editorStatus
      };
    });
  };

  onChangeText = text => {
    this.setState(state => {
      const touched = state.text !== text;
      return {
        text: text,
        touched,
        editorStatus: touched ? EditorStatus.UNSAVED : state.editorStatus
      };
    });
  };

  onSaveDraft = () => {
    let title = this.state.title || "";
    let text = this.state.text || "";
    this.setState({ editorStatus: EditorStatus.SAVING });
    this.props
      .onSaveDraft(title, text)
      .then(() => {
        this.setState({ editorStatus: EditorStatus.SAVED });
      })
      .catch(() => {
        this.setState({ editorStatus: EditorStatus.UNSAVED });
      });
  };

  onMetaValuesChange = debounce(values => {
    this.setState({ editorStatus: EditorStatus.SAVING });
    this.props
      .onUpdateMeta(values)
      .then(() => {
        this.setState({ editorStatus: EditorStatus.SAVED });
      })
      .catch(() => {
        this.setState({ editorStatus: EditorStatus.UNSAVED });
      });
  }, 500);

  onEditorAction = action => {
    switch (action) {
      case EditorActionType.SAVE_CHANGES:
        this.onSaveDraft();
        break;
      case EditorActionType.PUBLISH:
        this.props.onVerifyReadyForPublish().then(valid => {
          if (valid) {
            Modal.confirm({
              title: "Are you sure that you want to publish this post?",
              okText: "Yes, publish the post",
              cancelText: "Cancel",
              onOk: () => {
                this.props.onPublish();
              }
            });
          }
        });
        break;
      case EditorActionType.UPDATE:
        this.props.onVerifyReadyForPublish().then(valid => {
          if (valid) {
            Modal.confirm({
              title:
                "Are you sure that you what to update content of published post?",
              okText: "Yes, update the post",
              cancelText: "Cancel",
              onOk: () => {
                this.props.onPublish();
              }
            });
          }
        });
        break;
      case EditorActionType.DELETE_DRAFT:
        Modal.confirm({
          title: "Are you sure that you want to delete this post?",
          content: "This action cannot be undone!",
          okText: "Yes, delete the post",
          cancelText: "Cancel",
          onOk: () => {
            this.props.onDelete();
          }
        });
        break;
      case EditorActionType.DISCARD_DRAFT_CHANGES:
        Modal.confirm({
          title:
            "Are you sure that you what to discard all unpublished changes?",
          okText: "Yes, discard the changes",
          cancelText: "Cancel",
          onOk: () => {
            this.props.onDiscardChanges();
          }
        });
        break;
      case EditorActionType.UNPUBLISH:
        Modal.confirm({
          title: "Are you sure that you what to unpublish the post?",
          content:
            "This means that all reposts, links that led to the post will be broken.",
          okText: "Yes, unpublish the post",
          cancelText: "Cancel",
          onOk: () => {
            this.props.onUnpublish();
          }
        });
        break;
      case EditorActionType.CREATE_COPY:
        Modal.confirm({
          title: "Are you sure that you want to create the copy of this post?",
          okText: "Yes, create the copy",
          cancelText: "Cancel",
          onOk: () => {
            this.props.onCopy();
          }
        });
        break;
      case EditorActionType.TOGGLE_MODE:
        this.setState(state => {
          if (state.editorMode === EditorMode.EDIT_TEXT) {
            return {
              editorMode: EditorMode.EDIT_SETTINGS
            };
          }
          return {
            editorMode: EditorMode.EDIT_TEXT
          };
        });
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <EditorContainer>
        <EditorMainSection>
          <EditorHeader
            onAction={this.onEditorAction}
            editorMode={this.state.editorMode}
            editorStatus={this.state.editorStatus}
            isPublished={this.state.isPublished}
          />
          <div className="markdown-editor">
            <div className="markdown-editor-inner">
              {this.state.editorMode === EditorMode.EDIT_SETTINGS && (
                <MetaEditor
                  initialValues={this.state.meta}
                  onValuesChange={this.onMetaValuesChange}
                />
              )}
              <div
                style={{
                  display:
                    this.state.editorMode === EditorMode.EDIT_TEXT
                      ? "block"
                      : "none"
                }}
              >
                <TitleInput
                  autoFocus
                  placeholder="Post Title"
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                  onSave={this.onSaveDraft}
                />
                <SimpleMDE
                  placeholder="Begin writing your post..."
                  value={this.state.text}
                  onChange={this.onChangeText}
                  onOpenPreview={this.props.onOpenPreview}
                  extraKeys={{
                    "Ctrl-S": this.onSaveDraft,
                    "Cmd-S": this.onSaveDraft
                  }}
                />
              </div>
            </div>
          </div>
          <footer className="markdown-editor-footer" />
          <ToolbarHack />
        </EditorMainSection>
      </EditorContainer>
    );
  }
}

export default StoryEditor;
