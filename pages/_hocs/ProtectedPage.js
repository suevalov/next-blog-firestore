import React, { Component } from "react";
import NoSSR from "react-no-ssr";
import { autorun } from "mobx";
import { observer, inject } from "mobx-react";
import Router from "next/router";
import SplashLoader from "~/components/SplashLoader";

@inject("blog")
@observer
class ProtectedPageComponent extends Component {
  componentDidMount() {
    this.props.blog.auth.subscribe();
    this.disposer = autorun(() => {
      if (
        typeof window !== "undefined" &&
        !this.props.blog.auth.isUserPending &&
        !this.props.blog.auth.isAuthenticated
      ) {
        Router.push("/admin/login");
      }
    });
  }

  componentWillUnmount() {
    if (this.disposer) {
      this.disposer();
    }
  }

  render() {
    const { blog } = this.props;
    const { auth } = blog;
    const isLoaded = !auth.isUserPending && auth.isAuthenticated;
    return [
      isLoaded &&
        typeof this.props.children === "function" && (
          <div key="content">{this.props.children({ user: auth.user })}</div>
        ),
      <NoSSR key="loader">
        <SplashLoader loaded={isLoaded} />
      </NoSSR>
    ];
  }
}

export default ProtectedPageComponent;
