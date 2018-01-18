import React from "react";
import styled from "styled-components";
import { clearFix } from "polished";
import Media from "~/utils/media";
import FeedItem from "./FeedItem";
import FeedItemFeatured from "./FeedItemFeatured";

const ItemRow = styled.div`
  margin-left: -15px;
  margin-right: -15px;
  ${Media.sm`
    margin-left: 0;
    margin-right: 0;
  `};
  ${clearFix()};
`;

const SimpleItem = styled.div`
  float: left;
  width: 33.333333%;
  position: relative;
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
  box-sizing: border-box;
  margin-bottom: 30px;

  ${Media.sm`
    width: 100%;
    padding-left: 0;
    padding-right: 0;
  `};
`;

const FeaturedItem = styled.div`
  width: 100%;
  position: relative;
  min-height: 1px;
  margin-bottom: 30px;
`;

function makeRows(posts, withFeatured) {
  let featured = [];
  let simple = [];
  let rows = [];

  if (!withFeatured) {
    simple = [...posts];
  } else {
    if (posts.length <= 2) {
      featured = [...posts];
    } else {
      posts.forEach((post, index) => {
        const isFourth = index % 4 === 0;
        if (isFourth) {
          featured.push(post);
        } else {
          simple.push(post);
        }
      });
    }
  }
  featured.forEach((featured, index) => {
    rows.push([
      {
        ...featured,
        featured: true,
        even: index % 2
      }
    ]);
    if (simple.length >= 3) {
      const shifted = simple.splice(0, 3);
      rows.push([...shifted]);
    }
  });
  while (simple.length > 0) {
    const shifted = simple.splice(0, 3);
    rows.push([...shifted]);
  }
  return rows;
}

class PostsFeed extends React.Component {
  renderRow(row, index) {
    if (this.props.featured && row.length === 1 && row[0].featured) {
      const post = row[0];
      return (
        <FeaturedItem key={`featured-${post.url}`}>
          <FeedItemFeatured
            key={post.url}
            lazy={index > 0}
            title={post.title}
            image={post.thumbImage}
            text={post.thumbText}
            even={post.even}
            tags={post.tags}
            date={post.date}
            category={post.category}
            href={post.url}
          />
        </FeaturedItem>
      );
    }
    return (
      <ItemRow key={`simple-${index}`}>
        {row.map(post => {
          return (
            <SimpleItem key={post.url}>
              <FeedItem
                lazy={index > 0}
                title={post.title}
                image={post.thumbImage}
                text={post.thumbText}
                even={post.even}
                tags={post.tags}
                date={post.date}
                category={post.category}
                href={post.url}
              />
            </SimpleItem>
          );
        })}
      </ItemRow>
    );
  }

  render() {
    if (this.props.posts.length === 0) {
      return null;
    }
    const rows = makeRows(this.props.posts, this.props.featured);
    return <div>{rows.map((row, index) => this.renderRow(row, index))}</div>;
  }
}

PostsFeed.defaultProps = {
  featured: true,
  placeholder: ""
};

export default PostsFeed;
