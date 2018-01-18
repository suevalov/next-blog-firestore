import React from "react";
import { inject, observer } from "mobx-react";
import Router from "next/router";
import AdminPage from "~/components/admin/AdminPage";
import StoryEditor from "~/components/admin/Editor/StoryEditor";
import ProtectedPage from "~/pages/_hocs/ProtectedPage";
import ConnectedPage from "~/pages/_hocs/ConnectedPage";
import { Message } from "antd";

@inject("blog")
@observer
export class AdminNewStory extends React.Component {
  componentDidMount() {
    this.props.blog.categories.fetchCategories();
    if (this.props.postId) {
      this.fetchPost(this.props.postId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.postId && nextProps.postId !== this.props.postId) {
      this.fetchPost(nextProps.postId);
    }
  }

  fetchPost = postId => {
    this.props.blog.posts.fetchPost(postId).catch(error => {
      Router.push("/admin/editor", "/admin/editor", { shallow: true });
    });
  };

  onSaveDraft = (title, text) => {
    return this.props.blog.posts
      .savePost(this.props.postId, title, text)
      .then(newId => {
        if (this.props.postId !== newId) {
          const href = `/admin/editor?id=${newId}`;
          Router.push(href, href, { shallow: true });
        }
      })
      .catch(error => {
        console.error(error);
        Message.error(`Couldn't save changes`);
      });
  };

  onUpdateMeta = values => {
    return this.props.blog.posts
      .updateMeta(this.props.postId, values)
      .catch(error => {
        console.error(error);
        Message.error(`Couldn't save changes`);
      });
  };

  onPublish = async () => {
    try {
      const post = await this.props.blog.posts.publishPost(this.props.postId);
      Message.success("The post is published");
      return post;
    } catch (error) {
      console.error(error);
      Message.error(`Couldn't publish post`);
      return error;
    }
  };

  onVerifyReadyForPublish = async () => {
    const valid = await this.props.blog.posts.verifyDraftIsValid(
      this.props.postId
    );
    if (!valid) {
      Message.warning(
        `Not all required settings are set. Cannot publish the changes.`
      );
      return false;
    }
    return true;
  };

  onUnpublish = () => {
    return this.props.blog.posts
      .unpublishPost(this.props.postId)
      .then(() => {
        Message.success("The post is un-published");
      })
      .catch(error => {
        Message.error(`Couldn't un-publish the post`);
      });
  };

  onCopy = () => {
    return this.props.blog.posts
      .copyPost(this.props.postId)
      .then(newId => {
        Message.success("The post was copied");
        if (this.props.postId !== newId) {
          const href = `/admin/editor?id=${newId}`;
          Router.push(href, href, { shallow: true });
        }
      })
      .catch(error => {
        Message.error(`Couldn't copy the post`);
      });
  };

  onOpenPreview = () => {
    const win = window.open(
      `${window.location.origin}/preview?id=${this.props.postId}`,
      "_blank"
    );
    if (win) {
      //Browser has allowed it to be opened
      win.focus();
    } else {
      //Browser has blocked it
      alert("Please allow popups for this website");
    }
  };

  onDelete = () => {
    return this.props.blog.posts
      .deleteDraftPost(this.props.postId)
      .then(() => {
        Router.push("/admin");
      })
      .catch(error => {
        Message.error(`Couldn't delete the post`);
      });
  };

  onDiscardChanges = () => {
    return this.props.blog.posts
      .discardDraftChanges(this.props.postId)
      .then(() => {
        Message.success("All draft changes are discard");
      })
      .catch(error => {
        Message.error(`Couldn't discard draft changes`);
      });
  };

  render() {
    const currentPost = this.props.blog.posts.getPostForEditor(
      this.props.postId
    );
    return (
      <AdminPage user={this.props.user} noPadding>
        <StoryEditor
          initialValues={{
            id: currentPost ? currentPost.id : "",
            title: currentPost ? currentPost.title : "",
            text: currentPost ? currentPost.text : "",
            meta: currentPost ? currentPost.meta : {},
            isPublished: currentPost ? Boolean(currentPost.published) : false
          }}
          onOpenPreview={this.onOpenPreview}
          onSaveDraft={this.onSaveDraft}
          onUpdateMeta={this.onUpdateMeta}
          onVerifyReadyForPublish={this.onVerifyReadyForPublish}
          onPublish={this.onPublish}
          onUnpublish={this.onUnpublish}
          onCopy={this.onCopy}
          onDelete={this.onDelete}
          onDiscardChanges={this.onDiscardChanges}
        />
      </AdminPage>
    );
  }
}

export default props => {
  return (
    <ConnectedPage>
      <ProtectedPage>
        {({ user }) => (
          <AdminNewStory {...props} user={user} postId={props.url.query.id} />
        )}
      </ProtectedPage>
    </ConnectedPage>
  );
};
