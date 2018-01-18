import React from "react";
import { inject, observer } from "mobx-react";
import Router from "next/router";
import AdminPage from "~/components/admin/AdminPage";
import AdminPageSection from "~/components/admin/AdminPageSection";
import AdminPostsList from "~/components/admin/List/AdminPostsList";
import { Button } from "antd";
import ProtectedPage from "~/pages/_hocs/ProtectedPage";
import ConnectedPage from "~/pages/_hocs/ConnectedPage";
import Config from "~/utils/config";

const { Header } = AdminPageSection;

@inject("blog")
@observer
export class AdminIndex extends React.Component {
  componentDidMount() {
    this.props.blog.categories.fetchCategories();
    this.props.blog.posts.fetchAllPosts();
  }

  onNewStoryClick = () => {
    Router.push("/admin/editor");
  };

  renderHeaderActions = () => {
    return (
      <Button type="primary" size="large" onClick={this.onNewStoryClick}>
        New post
      </Button>
    );
  };

  render() {
    const { posts, categories } = this.props.blog;

    return (
      <AdminPage user={this.props.user}>
        <AdminPageSection>
          <Header renderActions={this.renderHeaderActions}>
            {Config.siteTitle} Posts
          </Header>
          <AdminPostsList
            isLoaded={posts.arePostsLoaded && categories.areCategoriesLoaded}
            posts={posts.filteredPosts}
            onResetFilters={posts.resetFilters}
          />
        </AdminPageSection>
      </AdminPage>
    );
  }
}

export default () => (
  <ConnectedPage>
    <ProtectedPage>{({ user }) => <AdminIndex user={user} />}</ProtectedPage>
  </ConnectedPage>
);
