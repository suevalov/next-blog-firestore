import React from "react";
import LogoBanner from "~/components/LogoBanner";
import Page from "~/components/Page";
import CustomHead from "~/components/CustomHead";
import Post from "~/components/Post";
import PreviewRibbon from "~/components/Post/PreviewRibbon";
import Config from "~/utils/config";
import { getPostLink } from "~/utils/links";
import LanguageSelector from "~/components/LanguageSelector";
import NextError from "next/error";
import * as Api from "~/utils/api";

export default class PreviewPostPage extends React.Component {
  static async getInitialProps({ query }) {
    const post = await Api.fetchDraftPost(query.id);
    return { post };
  }

  constructor(props) {
    super(props);
    this.state = {
      post: null,
      error: false
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      Api.fetchDraftPost(this.props.url.query.id).then(post => {
        this.setState({ post });
      });
    }, 1000);
  }

  componentDidCatch() {
    this.setState({
      error: true
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const post = this.state.post || this.props.post;
    if (!post) {
      return <NextError statusCode={404} />;
    }
    if (this.state.error) {
      return <NextError statusCode={500} />;
    }
    return (
      <Page lang={"en"}>
        <CustomHead
          title={"Preview: " + post.title}
          image={post.ogImage}
          video={post.ogVideo}
          description={post.thumbText}
          type="article"
          url={`${Config.baseUrl}${post.url}`}
        />
        <PreviewRibbon>Draft Version</PreviewRibbon>
        <LogoBanner lang="en" />
        {post.hasTranslation && (
          <LanguageSelector
            current={post.language}
            getLink={(language) => getPostLink(post.url, language.id)}
          />
        )}
        <Post post={post} disableComments />
      </Page>
    );
  }
}
