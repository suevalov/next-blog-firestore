import keys from "lodash.keys";
import Config from "~/utils/config";

export const getPostsByLanguage = (
  posts = [],
  lang = Config.defaultLanguage
) => {
  return posts.filter(post => post.language === lang);
};

export function getTags(posts = []) {
  const map = posts.reduce((acc, item) => {
    if (!item.tags) {
      return acc;
    }
    const tags = item.tags || [];
    tags.forEach(tag => {
      if (acc[tag]) {
        acc[tag] = acc[tag] + 1;
      } else {
        acc[tag] = 1;
      }
    });
    return acc;
  }, {});
  return keys(map).map(key => {
    return { value: key, count: map[key] };
  });
}

export const postsByTag = (posts = [], tag) => {
  return posts.filter(post => post.tags.indexOf(tag) !== -1);
};

export const postsByCategory = (posts = [], category) => {
  return posts.filter(
    post => post.category.toLowerCase() === category.toLowerCase()
  );
};

export const postsByAuthor = (posts = [], author) => {
  return posts.filter(
    post => post.author.toLowerCase() === author.toLowerCase()
  );
};
