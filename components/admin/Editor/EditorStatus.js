import React, { Component } from "react";
import { Badge } from "antd";
import { EditorStatus } from "./constants";

export default class extends Component {
  render() {
    let params = {};
    switch (this.props.status) {
      case EditorStatus.SAVING:
        params = {
          status: "processing",
          text: "Saving..."
        };
        break;
      case EditorStatus.UNSAVED:
        params = {
          status: "warning",
          text: "Unsaved changes"
        };
        break;
      case EditorStatus.SAVED:
        params = {
          status: "success",
          text: "Saved"
        };
        break;
      default:
        params = {
          text: this.props.status
        };
        break;
    }
    return <Badge {...params} />;
  }
}
