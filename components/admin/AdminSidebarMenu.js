import React from "react";
import { inject } from "mobx-react";
import { Menu, Icon } from "antd";
import Router from "next/router";
import Config from "~/utils/config";

@inject("blog")
class AdminSidebarMenu extends React.Component {
  onSignOutClick = () => {
    this.props.blog.auth.signOut();
  };

  onMenuClick = event => {
    if (event.key === "signout") {
      this.onSignOutClick();
    } else if (event.key === "new_post") {
      Router.push("/admin/editor");
    } else if (event.key === "posts") {
      Router.push("/admin");
    } else if (event.key === "settings") {
      Router.push("/admin/settings");
    }
  };

  getCurrentItem() {
    const pathname = Router.pathname;
    if (pathname === "/admin/editor") {
      return "new_post";
    } else if (pathname === "/admin/settings") {
      return "settings";
    }
    return "stories";
  }

  render() {
    return (
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={[this.getCurrentItem()]}
        onClick={this.onMenuClick}
      >
        <Menu.Item key="new_post">
          <Icon type="file" />
          <span>New post</span>
        </Menu.Item>
        <Menu.Item key="posts">
          <Icon type="book" />
          <span>Posts</span>
        </Menu.Item>
        <Menu.Item key="settings">
          <Icon type="setting" />
          <span>Settings</span>
        </Menu.Item>
        <Menu.ItemGroup key="user" title="User">
          <Menu.Item key="signout">
            <Icon type="logout" />
            <span>Sign out</span>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    );
  }
}

export default AdminSidebarMenu;
