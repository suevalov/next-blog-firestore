import React from "react";
import values from "lodash.values";
import { Link } from "~/utils/routes";
import Config from "~/utils/config";

const linkify = text => (text || "").toLowerCase().replace(/ /g, "_");

export function getPostLink(href, currentLang = Config.defaultLanguage) {
  const languages = values(Config.languages).filter(
    language => language.id !== Config.defaultLanguage
  );

  let linkLanguage = Config.defaultLanguage;

  for (let i = 0; i < languages.length; i = +1) {
    if (href.indexOf(`/${languages[i].id}/`)) {
      linkLanguage = languages[i].id;
      break;
    }
  }

  const isNotDefault = linkLanguage !== Config.defaultLanguage;
  let newHref = href;
  if (currentLang === Config.defaultLanguage && isNotDefault) {
    newHref = href.split(`/${linkLanguage}/`).join("/");
  } else {
    newHref = href.split(`/${linkLanguage}/`).join("/");
    newHref = `/posts/${currentLang}/` + newHref.replace("/posts/", "");
  }
  return {
    href: `/post?fullUrl=${newHref}`,
    as: newHref
  };
}
export function PostLink({ href, children, className, prefetch }) {
  return (
    <Link prefetch={prefetch} href={`/post?fullUrl=${href}`} as={href}>
      <a className={className}>{children}</a>
    </Link>
  );
}

export function getTagLink(tag, lang = Config.defaultLanguage) {
  return {
    route: "tag",
    params: {
      tag: linkify(tag),
      lang
    }
  };
}
export function TagLink({ tag, lang, children, className }) {
  return (
    <Link {...getTagLink(tag, lang)}>
      <a className={className}>{children}</a>
    </Link>
  );
}

export function getCategoryLink(category, lang = Config.defaultLanguage) {
  return {
    route: "category",
    params: {
      category: linkify(category),
      lang
    }
  };
}
export function CategoryLink({ category, lang, children, className }) {
  return (
    <Link {...getCategoryLink(category, lang)}>
      <a className={className}>{children}</a>
    </Link>
  );
}

export function getAuthorLink(author, lang = Config.defaultLanguage) {
  return {
    route: "author",
    params: {
      author: linkify(author),
      lang
    }
  };
}

export function getIndexLink(lang = Config.defaultLanguage) {
  return {
    route: "index",
    params: {
      lang
    }
  };
}

export function AuthorLink({ author, lang, children, className }) {
  return (
    <Link {...getAuthorLink(author, lang)}>
      <a className={className}>{children}</a>
    </Link>
  );
}

export default {
  PostLink,
  TagLink,
  CategoryLink,
  AuthorLink
};
