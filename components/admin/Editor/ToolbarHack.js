import { Component } from "react";

export default class ToolbarHack extends Component {
  componentDidMount() {
    this.hackEditor();
  }

  hackEditor = () => {
    const $ = require("cash-dom");
    const $footer = $(".markdown-editor-footer");
    const $toolbar = $(".editor-toolbar");
    const $status = $(".editor-statusbar");
    $toolbar.appendTo($footer);
    $status.appendTo($footer);
  };

  render() {
    return null;
  }
}
