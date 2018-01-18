import React from "react";
import { createElement } from "react";
import marksy from "marksy/components";
import Blockquote from "~/components/Post/Blockquote";
import Image from "~/components/Post/Image";
import ImageGrid from "~/components/Post/ImageGrid";
import Player from "~/components/Player";
import Hr from "~/components/Hr";

const compile = marksy({
  createElement,
  elements: {
    hr() {
      return <Hr />;
    }
  },
  components: {
    Blockquote,
    Player,
    Image,
    ImageGrid
  }
});

export default compile;
