import React from "react";
import LogoBanner from "~/components/LogoBanner";
import Page from "~/components/Page";
import CustomHead from "~/components/CustomHead";
import Post from "~/components/Post";
import Config from "~/utils/config";
import { getPostLink } from "~/utils/links";
import LanguageSelector from "~/components/LanguageSelector";
import NextError from "next/error";
import * as Api from "~/utils/api";

export default class PostPage extends React.Component {
  static async getInitialProps({ query }) {
    const url = query ? query.fullUrl : "";
    const post = await Api.fetchPublishedPost(url);
    return { post, fullUrl: url };
  }

  render() {
    const { post, fullUrl } = this.props;
    if (!post) {
      return <NextError statusCode={404} />;
    }
    return (
      <Page lang={post.language}>
        <CustomHead
          title={post.title}
          image={post.ogImage}
          video={post.ogVideo}
          description={post.thumbText}
          type="article"
          url={`${Config.baseUrl}${post.url}`}
        />
        <LogoBanner lang={post.language} />
        {post.hasTranslation && (
          <LanguageSelector
            current={post.language}
            getLink={(language) => getPostLink(fullUrl, language.id)}
          />
        )}
        <Post post={post} />
      </Page>
    );
  }
}
