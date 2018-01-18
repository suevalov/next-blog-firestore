import React from "react";
import moment from "moment";
import { inject } from "mobx-react";
import { Link } from "~/utils/routes";
import styled from "styled-components";
import { Tag } from "antd";
import { PostStatus } from "~/stores/postsStore";

const ItemContainer = styled.div`
  border-bottom: 1px solid #e5eff5;
  margin: 0;
  margin-left: -20px;
  margin-right: -20px;
  padding: 24px 20px 12px;
  position: relative;
  cursor: pointer;

  &:hover {
    background-color: #fcfcfc;
  }

  .ant-tag {
    margin-left: 4px;
    margin-right: 4px;
  }
  .status.ant-tag {
    margin-left: 0;
  }
`;

const ItemTitle = styled.h2`
  display: inline-block;
  font-size: 20px;
`;

const ItemTextPreview = styled.p`
  margin-top: 10px;
  display: block;
  max-width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
`;

const ItemStatus = styled.div`
  margin: 10px auto;
`;

@inject("blog")
class AdminPostsListItem extends React.Component {
  renderStatus(status) {
    let color = "green";
    let text = "Published";

    if (status === PostStatus.Draft) {
      color = "orange";
      text = "Draft";
    } else if (status === PostStatus.PendingCorrections) {
      color = "orange";
      text = "Pending corrections";
    }

    return (
      <Tag className="status" color={color}>
        {text}
      </Tag>
    );
  }

  renderPostCategory(category) {
    const categoryObj = this.props.blog.categories.categories.get(category);
    if (!categoryObj) {
      return null;
    }
    return (
      <span>
        <Tag>Category: {categoryObj.title}</Tag>
      </span>
    );
  }

  renderPostLanguage(language) {
    const languageObj = this.props.blog.ui.languages.get(language);
    if (!languageObj) {
      return null;
    }
    return (
      <span>
        <Tag>Language: {languageObj.title}</Tag>
      </span>
    );
  }

  renderPostAuthor(author) {
    const authorObj = this.props.blog.authors.authors.get(author);
    if (!authorObj) {
      return null;
    }
    return (
      <span>
        <Tag>Author: {authorObj.name}</Tag>
      </span>
    );
  }

  renderPostChanged(changed) {
    return (
      <span>
        <Tag>Last change: {moment(changed).calendar()}</Tag>
      </span>
    );
  }

  render() {
    const { post } = this.props;

    let status;
    let content;
    if (post.status === PostStatus.Published && post.published) {
      status = PostStatus.Published;
      content = post.published;
    } else if (post.status === PostStatus.Draft && post.published) {
      status = PostStatus.PendingCorrections;
      content = {
        ...post.published,
        ...post.draft
      };
    } else {
      status = PostStatus.Draft;
      content = post.draft;
    }

    const { title, changed, meta } = content;

    return (
      <Link key={post.id} route={`/admin/editor?id=${post.id}`}>
        <a>
          <ItemContainer>
            <ItemTitle>{title}</ItemTitle>
            <ItemTextPreview>{meta.thumbText || "..."}</ItemTextPreview>
            <ItemStatus>
              {this.renderStatus(status)}
              {meta.language && this.renderPostLanguage(meta.language)}
              {meta.category && this.renderPostCategory(meta.category)}
              {meta.author && this.renderPostAuthor(meta.author)}
              {changed && this.renderPostChanged(changed)}
            </ItemStatus>
          </ItemContainer>
        </a>
      </Link>
    );
  }
}

export default AdminPostsListItem;
