import React from "react";
import styled from "styled-components";
import AdminPostsFilters from "./AdminPostsFilters";
import { Button } from "antd";
import AdminPostsListItem from "./AdminPostsListItem";

const NotFound = styled.div`
  margin: 100px auto;
  text-align: center;

  h2 {
    font-size: 20px;
    margin-bottom: 20px;
  }
`;

export default class AdminPostsList extends React.Component {
  renderPost(post) {
    return <AdminPostsListItem key={post.id} post={post} />;
  }

  renderNotFound() {
    return (
      <NotFound>
        <h2>No stories match the current filter</h2>
        <Button onClick={this.props.onResetFilters}>Reset filter</Button>
      </NotFound>
    );
  }

  render() {
    return (
      <div>
        <AdminPostsFilters />
        {this.props.posts.length > 0
          ? this.props.posts.map(this.renderPost)
          : this.renderNotFound()}
      </div>
    );
  }
}
