import React, { Component } from "react";
import { Provider } from "mobx-react";
import { BlogStore } from "~/stores";

const blogStore = BlogStore.create({});

export default class ConnectedPage extends Component {
  render() {
    return <Provider blog={blogStore}>{this.props.children}</Provider>;
  }
}
