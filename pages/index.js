import React from "react";
import { Grid, Row, Col } from "react-styled-flexboxgrid";
import Page from "~/components/Page";
import CustomHead from "~/components/CustomHead";
import LogoBanner from "~/components/LogoBanner";
import SidebarBlock from "~/components/Sidebar/SidebarBlock";
import TagsCloud from "~/components/Sidebar/TagsCloud";
import { getTags } from "~/utils/content";
import PostsFeed from "~/components/PostsFeed";
import LanguageSelector from "~/components/LanguageSelector";
import { getIndexLink } from "~/utils/links";
import LazyPostsFetcher from "~/pages/_hocs/LazyPostsFetcher";
import LoadMoreButton from "~/components/LoadMoreButton";

class Index extends React.Component {
  render() {
    const { lang, posts, hasMore, onLoadMore } = this.props;
    return (
      <Page lang={lang}>
        <CustomHead />
        <LogoBanner lang={lang} />
        <LanguageSelector
          current={lang}
          getLink={language => getIndexLink(language.id)}
        />
        <Grid style={{ overflow: "hidden" }}>
          <Row>
            <Col xs={12} sm={12} md={9}>
              <PostsFeed posts={posts} />
            </Col>
            <Col xs={false} sm={false} md={3}>
              <div style={{ paddingLeft: 20 }}>
                <SidebarBlock title="Tags">
                  <TagsCloud tags={getTags(posts)} lang={lang} />
                </SidebarBlock>
              </div>
            </Col>
          </Row>
          {hasMore && (
            <Row>
              <Col xs={12} sm={12} md={9}>
                <LoadMoreButton
                  onClick={onLoadMore}
                  title={"Load older posts"}
                />
              </Col>
            </Row>
          )}
        </Grid>
      </Page>
    );
  }
}

const POSTS_PER_PAGE = 5;

export default LazyPostsFetcher(Index, POSTS_PER_PAGE);
