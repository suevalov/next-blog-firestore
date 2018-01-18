import React from "react";
import Head from "next/head";
import Config from "~/utils/config";

function CustomHead(props) {
  const { url, type, image, video } = props;
  const title = props.title
    ? `${props.title} - ${Config.siteTitle}`
    : Config.siteTitle;
  const description = props.description
    ? props.description
    : Config.description;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:type" content={type || "website"} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {video && <meta property="og:video" content={video} />}
      {image && <meta property="og:image" content={image} />}
    </Head>
  );
}

export default CustomHead;
