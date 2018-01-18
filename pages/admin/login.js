import React from "react";
import { inject, observer } from "mobx-react";
import { autorun } from "mobx";
import AdminPage from "~/components/admin/AdminPage";
import Router from "next/router";
import ConnectedPage from "~/pages/_hocs/ConnectedPage";
import styled from "styled-components";
import Config from "~/utils/config";

const PageContainter = styled.div`
  color: #000;
  background: #fff;
  height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginButton = styled.button`
  background-color: transparent;
  border-width: 0;
  font-size: 18px;
  cursor: pointer;
`;

@inject("blog")
@observer
class AdminLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessDenied: false
    };
  }

  componentDidMount() {
    this.props.blog.auth.subscribe();
    this.disposer = autorun(() => {
      if (this.props.blog.auth.isAuthenticated) {
        Router.replace("/admin");
      }
    });
  }

  componentWillUnmount() {
    if (this.disposer) {
      this.disposer();
    }
  }

  onLoginClick = () => {
    const { auth } = this.props.blog;
    auth
      .signInWithGoogle()
      .then(({ user }) => {
        auth.verifyIfUserIsAuthor(user).then(authorName => {
          if (!authorName) {
            this.setState({ accessDenied: true });
          }
        });
      })
      .catch(() => {
        this.setState({ accessDenied: true });
      });
  };

  render() {
    const { isUserPending, isAuthenticated } = this.props.blog.auth;

    return (
      <AdminPage key="content" withLayout={false}>
        <PageContainter>
          {this.state.accessDenied === false &&
            (isUserPending || isAuthenticated) && <h2>...</h2>}
          {this.state.accessDenied === false &&
            !isUserPending &&
            !isAuthenticated && (
              <LoginButton onClick={this.onLoginClick}>
                Click to start writing...
              </LoginButton>
            )}
          {this.state.accessDenied && (
            <h2>Become an author to start writing on {Config.siteTitle}</h2>
          )}
        </PageContainter>
      </AdminPage>
    );
  }
}

export default () => (
  <ConnectedPage>
    <AdminLogin />
  </ConnectedPage>
);
