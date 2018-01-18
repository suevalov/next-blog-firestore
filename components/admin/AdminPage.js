import React from "react";
import { LocaleProvider } from "antd";
import enUS from "antd/lib/locale-provider/en_US";
import Head from "next/head";
import NProgress from "nprogress";
import Router from "next/router";
import { inject, observer } from "mobx-react";
import styled, { css, ThemeProvider } from "styled-components";
import { Layout } from "antd";
import AdminSidebarMenu from "./AdminSidebarMenu";
import AdminUserMenu from "./AdminUserMenu";
import Config from "~/utils/config";
import theme from "~/utils/theme";
import fonts from "~/utils/fonts";

Router.onRouteChangeStart = url => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const MainLayout = styled(Layout)`
  background: #fff !important;
`;

const Sider = styled(Layout.Sider)`
  position: fixed !important;
  overflow: auto;
  height: 100vh;
  left: 0;
  background-color: #f4f8fb !important;
  width: 300px;

  .ant-menu-inline,
  .ant-menu-vertical {
    border-color: #f4f8fb;
  }
  .ant-menu-item,
  .ant-menu-item-group-title {
    background-color: #f4f8fb !important;
    font-size: 14px !important;
  }
  .ant-menu-item-group-title {
    ${props =>
      props.collapsed
        ? css`
            text-align: center;
          `
        : css`
            text-align: left;
          `};
  }
  .ant-menu-item:hover {
    background-color: #cfe6f7 !important;
  }
`;

const Content = styled(({ noPadding, ...rest }) => (
  <Layout.Content {...rest} />
))`
  font-size: 14px;
  overflow: initial;
  position: relative;
  margin: 0;
  padding: ${props => (props.noPadding ? "0px" : "24px 16px 0")};
  min-height: 100vh;
`;

const TriggerIcon = styled.div`
  border: 5px solid #f4f8fb;
  border-radius: 4px;
  cursor: pointer;
  display: block;
  height: 34px;
  position: absolute;
  left: -15px;
  top: 25px;
  width: 25px;
  z-index: 999;
`;

const LayoutContent = styled(({ collapsed, ...rest }) => <Layout {...rest} />)`
  margin-left: ${props => (props.collapsed ? "64px" : "260px")};
  transition: all 0.2s;
  background: #fff !important;
`;

@inject("blog")
@observer
class AdminPage extends React.Component {
  componentDidMount() {
    fonts();
  }

  renderLayout() {
    const { collapsedSidebar, toggleSidebar } = this.props.blog.ui;
    return (
      <MainLayout>
        <Sider
          width={260}
          trigger={null}
          collapsible
          collapsed={collapsedSidebar}
        >
          <AdminUserMenu user={this.props.user} collapsed={collapsedSidebar} />
          <AdminSidebarMenu />
        </Sider>
        <LayoutContent collapsed={collapsedSidebar}>
          <Content noPadding={this.props.noPadding}>
            <TriggerIcon onClick={toggleSidebar} />
            {this.props.children}
          </Content>
        </LayoutContent>
      </MainLayout>
    );
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <LocaleProvider locale={enUS}>
          <div>
            <Head>
              <title>Editor - {Config.siteTitle}</title>
              <link
                rel="stylesheet"
                href="https://unpkg.com/antd@2.13.3/dist/antd.min.css"
              />
              <link
                rel="stylesheet"
                href="https://unpkg.com/nprogress@0.2.0/nprogress.css"
              />
            </Head>
            {this.props.withLayout ? this.renderLayout() : this.props.children}
          </div>
        </LocaleProvider>
      </ThemeProvider>
    );
  }
}

AdminPage.defaultProps = {
  withLayout: true,
  noPadding: false
};

export default AdminPage;
