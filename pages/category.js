import React from "react";
import styled from "styled-components";
import { Grid, Row, Col } from "react-styled-flexboxgrid";
import Page from "~/components/Page";
import CustomHead from "~/components/CustomHead";
import LogoBanner from "~/components/LogoBanner";
import SidebarBlock from "~/components/Sidebar/SidebarBlock";
import TagsCloud from "~/components/Sidebar/TagsCloud";
import { postsByCategory, getTags } from "~/utils/content";
import { getCategoryLink } from "~/utils/links";
import PostsFeed from "~/components/PostsFeed";
import LanguageSelector from "~/components/LanguageSelector";
import LazyPostsFetcher from "~/pages/_hocs/LazyPostsFetcher";

const Header = styled.div`
  text-align: center;
  display: block;

  h2 {
    margin-top: 0;
    margin-bottom: 10px;
  }

  h1 {
    margin-top: 10px;
    margin-bottom: 40px;
    text-transform: uppercase;
  }
`;

class CategoryPage extends React.Component {
  render() {
    const { category } = this.props.url.query;
    const { lang } = this.props;
    const posts = postsByCategory(this.props.posts, category);
    return (
      <Page lang={lang}>
        <CustomHead />
        <LogoBanner lang={lang} />
        <LanguageSelector
          current={lang}
          getLink={language => getCategoryLink(category, language.id)}
        />
        <Grid style={{ overflow: "hidden" }}>
          <Row>
            <Col xs={12}>
              <Header>
                <h2>Browsing by category</h2>
                <h1>{category}</h1>
              </Header>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={9}>
              <PostsFeed posts={posts} featured={false} />
            </Col>
            <Col xs={false} sm={false} md={3}>
              <div style={{ paddingLeft: 20 }}>
                <SidebarBlock title="Tags">
                  <TagsCloud tags={getTags(posts)} lang={lang} />
                </SidebarBlock>
              </div>
            </Col>
          </Row>
        </Grid>
      </Page>
    );
  }
}

export default LazyPostsFetcher(CategoryPage);
