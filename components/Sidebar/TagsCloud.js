import React from "react";
import { Tag } from "~/components/Post/Tags";

export default class TagsCloud extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { className, tags, lang } = this.props;
    return (
      <div className={className}>
        {tags.map(tag => (
          <Tag
            key={tag.value}
            tag={tag.value}
            lang={lang}
            style={{ fontSize: 10 }}
          >
            #{tag.value}
          </Tag>
        ))}
      </div>
    );
  }
}
