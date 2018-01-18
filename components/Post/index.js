import React from "react";
import NoSSR from "react-no-ssr";
import { Grid, Row, Col } from "react-styled-flexboxgrid";
import styled from "styled-components";
import compile from "~/utils/compile";
import PostAuthor from "./PostAuthor";
import Article from "./Article";
import PostShare from "./PostShare";
import PostComments from "./PostComments";
import ArticleTitle from "./ArticleTitle";
import Tags from "./Tags";
import Media from "~/utils/media";
import Config from "~/utils/config";

const StyledPostAuthor = styled(PostAuthor)`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const TagsCol = styled(Col)`
  text-align: left;
  ${Media.md`
    text-align: center;
  `};
`;

const SocialCol = styled(Col)`
  text-align: right;
  ${Media.md`
    text-align: center;
  `};
`;

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tree: compile(props.post.text).tree
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.post && nextProps.post.text !== this.props.post.text) {
      this.setState({
        tree: compile(nextProps.post.text).tree
      });
    }
  }

  render() {
    const post = this.props.post;
    if (!post || !post.author || !Config.authors[post.author]) {
      return null;
    }
    const authorInfo = Config.authors[post.author];
    return (
      <div>
        <Grid style={{ padding: 0 }}>
          <Row style={{ margin: 0 }}>
            <Col xs={12} lg={10} lgOffset={1} style={{ padding: 0 }}>
              <ArticleTitle
                author={post.author}
                authorInfo={authorInfo}
                title={post.title}
                video={post.fullscreenVideo}
                date={post.date}
                category={post.category}
              />
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row style={{ margin: 0 }}>
            <Col xs={12} lg={8} lgOffset={2}>
              <Article>{this.state.tree}</Article>
            </Col>
          </Row>
          <Row style={{ margin: 0 }}>
            <TagsCol
              xs={10}
              xsOffset={1}
              md={5}
              mdOffset={1}
              lg={4}
              lgOffset={2}
            >
              {post.tags && <Tags tags={post.tags} />}
            </TagsCol>
            <SocialCol
              xs={10}
              xsOffset={1}
              md={5}
              mdOffset={0}
              lg={4}
              lgOffset={0}
            >
              <NoSSR>
                <PostShare
                  key={`post-share-${post.id}`}
                  title={post.title}
                  url={post.url}
                />
              </NoSSR>
            </SocialCol>
          </Row>
          <Row style={{ margin: 0 }}>
            <Col xs={10} xsOffset={1} lg={8} lgOffset={2}>
              {post.author && (
                <StyledPostAuthor
                  author={post.author}
                  authorInfo={authorInfo}
                />
              )}
              {this.props.disableComments === true ? null : (
                <NoSSR>
                  <PostComments
                    key={`post-comments-${post.id}`}
                    url={post.url}
                    title={post.title}
                  />
                </NoSSR>
              )}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
