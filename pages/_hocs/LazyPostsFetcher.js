import React from "react";
import * as Api from "~/utils/api";

export default (WrappedComponent, POSTS_PER_PAGE) =>
  class LazyPostsFetcher extends React.Component {
    static async getInitialProps({ query }) {
      const posts = await Api.fetchAllPublishedPosts(
        query.lang,
        POSTS_PER_PAGE
      );
      return {
        [query.lang]: { posts, hasMore: posts.length === POSTS_PER_PAGE }
      };
    }

    constructor(props) {
      super(props);
      this.state = props;
    }

    componentWillReceiveProps(nextProps) {
      const nextLanguage = nextProps.url.query.lang;
      const currentLanguage = this.props.url.query.lang;
      if (!this.state[nextLanguage] && nextLanguage !== currentLanguage) {
        this.setState(state => ({
          [nextLanguage]: state[currentLanguage]
        }));
        Api.fetchAllPublishedPosts(nextLanguage, POSTS_PER_PAGE).then(posts => {
          this.setState({
            [nextLanguage]: {
              posts,
              hasMore: posts.length === POSTS_PER_PAGE
            }
          });
        });
      }
    }

    onLoadOlderClick = () => {
      const postsToFetch = POSTS_PER_PAGE * 2;
      const lang = this.props.url.query.lang;
      const posts = this.state[lang] ? this.state[lang].posts : [];
      Api.fetchAllPublishedPosts(lang, postsToFetch, posts.length).then(
        posts => {
          this.setState(state => ({
            [lang]: {
              posts: [...state[lang].posts, ...posts],
              hasMore: posts.length === postsToFetch
            }
          }));
        }
      );
    };

    render() {
      const lang = this.props.url.query.lang;
      const posts = this.state[lang] ? this.state[lang].posts : [];
      const hasMore = this.state[lang] ? this.state[lang].hasMore : false;

      return (
        <WrappedComponent
          {...this.props}
          lang={lang}
          posts={posts}
          hasMore={hasMore}
          onLoadMore={this.onLoadOlderClick}
        />
      );
    }
  };
