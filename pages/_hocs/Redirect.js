import { Component } from "react";
import Router from "next/router";

export default class Redirect extends Component {
  componentDidMount() {
    Router.push(this.props.to);
  }

  render() {
    return null;
  }
}
