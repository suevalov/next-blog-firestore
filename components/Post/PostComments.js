import React from "react";
import styled from "styled-components";
import DisqusThread from "~/components/DiscusThread";
import Config from "~/utils/config";

const PostCommentsContainer = styled.div`
  display: block;
  margin-bottom: 26px;
  min-height: 323px;

  .dsq-brlink {
    display: none;
  }
`;

class PostComments extends React.Component {
  render() {
    const url = `${window.location.origin}${this.props.url}`;
    return (
      <DisqusThread
        shortname={Config.disqusShortname}
        title={this.props.title}
        identifier={url}
        url={url}
      />
    );
  }
}

export default props => (
  <PostCommentsContainer>
    <PostComments {...props} />
  </PostCommentsContainer>
);
