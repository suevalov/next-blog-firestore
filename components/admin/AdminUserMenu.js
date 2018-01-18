import React from "react";
import styled from "styled-components";
import ellipsis from "polished/lib/mixins/ellipsis";
import { Avatar } from "antd";

const Container = styled.div`
  margin: 24px;
  margin-bottom: 14px;
  margin-left: ${props => (props.collapsed ? "18px" : "24px")};
  margin-right: ${props => (props.collapsed ? "18px" : "24px")};
  height: 32px;
  overflow: hidden;
  cursor: pointer;
`;

const UserAvatar = styled(Avatar)`
  float: left;
`;

const UserName = styled.div`
  display: inline-block;
  float: left;
  line-height: 32px;
  margin-left: 10px;
  font-size: 14px;
  ${ellipsis("160px")};
`;

class AdminUserMenu extends React.Component {
  render() {
    return (
      <Container collapsed={this.props.collapsed}>
        <UserAvatar
          shape="square"
          size={this.props.collapsed ? "small" : "default"}
          src={this.props.user.photoURL}
        />
        {!this.props.collapsed && (
          <UserName>{this.props.user.displayName}</UserName>
        )}
      </Container>
    );
  }
}

export default AdminUserMenu;
