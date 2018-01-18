// @ts-check

import { types, flow, getParent } from "mobx-state-tree";
import moment from "moment";
import sortBy from "lodash.sortby";
import Config from "~/utils/config";
import { firestore } from "./firebaseInit";

export const createMeta = (meta = {}) => ({
  url: "",
  category: "",
  author: "",
  language: Config.defaultLanguage,
  featured: false,
  tags: [],
  hasTranslation: false,
  date: moment().format("YYYY-MM-DD"),
  thumbImage: "",
  thumbText: "",
  ...meta
});

export const PostStatus = {
  Draft: "draft",
  Published: "published",
  PendingCorrections: "pending_corrections"
};

export const PostsOrder = {
  Newest: "newest",
  Oldest: "oldest",
  ByPublication: "by_publication"
};

export const PostMeta = types.model("PostMeta", {
  url: types.string,
  featured: types.maybe(types.boolean),
  language: types.string,
  author: types.string,
  category: types.string,
  date: types.string,
  tags: types.array(types.string),
  hasTranslation: types.boolean,
  thumbImage: types.string,
  thumbText: types.string,
  fullscreenVideo: types.maybe(types.string),
  ogImage: types.maybe(types.string)
});

export const PostContent = types.model("PostContent", {
  title: types.string,
  text: types.string,
  changed: types.number,
  meta: types.maybe(PostMeta)
});

export const Post = types.model("Post", {
  id: types.identifier(),
  changed: types.number,
  status: types.enumeration("Status", [PostStatus.Draft, PostStatus.Published]),
  published: types.maybe(PostContent),
  draft: types.maybe(PostContent)
});

export const PostsStore = types
  .model("PostsStore", {
    posts: types.map(Post),
    arePostsLoaded: types.boolean,
    sortBy: types.enumeration("sortBy", [
      PostsOrder.Newest,
      PostsOrder.Oldest,
      PostsOrder.ByPublication
    ]),
    status: types.string,
    author: types.string,
    language: types.string,
    category: types.string
  })
  .views(self => ({
    get blog() {
      return getParent(self);
    },
    get filteredPosts() {
      let posts = self.posts.values().filter(post => post);

      if (self.status !== "all") {
        if (self.status === PostStatus.Draft) {
          posts = posts.filter(post => {
            return post.status === PostStatus.Draft && !post.published;
          });
        } else if (self.status === PostStatus.Published) {
          posts = posts.filter(post => {
            return post.status === PostStatus.Published && post.published;
          });
        } else {
          posts = posts.filter(post => {
            return post.status === PostStatus.Draft && post.published;
          });
        }
      }

      if (self.author !== "all") {
        posts = posts.filter(post => {
          if (post.status === PostStatus.Draft) {
            return post.draft.meta.author === self.author;
          } else {
            return post.published.meta.author === self.author;
          }
        });
      }

      if (self.category !== "all") {
        posts = posts.filter(post => {
          if (post.status === PostStatus.Draft) {
            return post.draft.meta.category === self.category;
          } else {
            return post.published.meta.category === self.category;
          }
        });
      }

      if (self.language !== "all") {
        posts = posts.filter(post => {
          if (post.status === PostStatus.Draft) {
            return post.draft.meta.language === self.language;
          } else {
            return post.published.meta.language === self.language;
          }
        });
      }

      return sortBy(posts, post => {
        if (self.sortBy === PostsOrder.Newest) {
          return -post.changed;
        } else if (self.sortBy === PostsOrder.Oldest) {
          return post.changed;
        } else if (self.sortBy === PostsOrder.ByPublication) {
          return post.draft.meta.date;
        }
        return true;
      });
    },
    getPostForEditor(postId) {
      const post = self.posts.get(postId);
      if (!post) {
        return null;
      }
      return {
        ...post,
        ...post.published,
        ...post.draft
      };
    }
  }))
  .actions(self => ({
    changeFilters(filters = {}) {
      if (filters.sortBy) {
        self.sortBy = filters.sortBy;
      }
      if (filters.status) {
        self.status = filters.status;
      }
      if (filters.author) {
        self.author = filters.author;
      }
      if (filters.language) {
        self.language = filters.language;
      }
      if (filters.category) {
        self.category = filters.category;
      }
    },

    resetFilters() {
      self.status = "all";
      self.author = "all";
      self.language = "all";
      self.category = "all";
    },

    getPost: flow(function* getPost(id) {
      const doc = yield firestore
        .collection("posts")
        .doc(id)
        .get();
      if (!doc.exists) {
        throw new Error(`Couldn't get post ${id}`);
      }
      const post = doc.data();
      return post;
    }),

    fetchAllPosts: flow(function* fetchAllPosts() {
      try {
        const querySnapshot = yield firestore.collection("posts").get();
        querySnapshot.forEach(doc => {
          const post = doc.data();
          self.posts.put(post);
        });
        self.arePostsLoaded = true;
      } catch (e) {}
    }),

    fetchPost: flow(function* fetchPost(id) {
      // @ts-ignore
      const post = yield self.getPost(id);
      self.posts.set(id, post);
      return post;
    }),

    savePost: flow(function* savePost(id, title, text) {
      if (!id) {
        // @ts-ignore
        return self.saveNewPost(title, text);
      }

      // @ts-ignore
      const post = yield self.getPost(id);
      const now = moment.now();

      const updatedPost = {
        ...post,
        changed: now,
        status: PostStatus.Draft,
        draft: {
          ...post.draft,
          title,
          text,
          changed: now
        }
      };

      self.posts.set(updatedPost.id, updatedPost);

      yield firestore
        .collection("posts")
        .doc(id)
        .update(updatedPost);

      return id;
    }),

    saveNewPost: flow(function* saveNewPost(title, text) {
      const newDraftRef = firestore.collection("posts").doc();
      const id = newDraftRef.id;
      const now = moment.now();
      const currentAuthor = self.blog.authors.currentAuthor;

      const newPost = {
        id,
        changed: now,
        status: PostStatus.Draft,
        draft: {
          title: title || "(Untitled)",
          text: text || "",
          changed: now,
          meta: createMeta({
            author: currentAuthor ? currentAuthor.id : ""
          })
        }
      };

      // @ts-ignore
      self.posts.set(id, newPost);

      yield newDraftRef.set(newPost);

      return id;
    }),

    updateMeta: flow(function* updateMeta(id, values) {
      // @ts-ignore
      const post = yield self.getPost(id);
      const now = moment.now();

      const updatedPost = {
        ...post,
        changed: now,
        status: PostStatus.Draft,
        draft: {
          ...post.draft,
          changed: now,
          meta: {
            ...post.draft.meta,
            ...values
          }
        }
      };

      self.posts.set(updatedPost.id, updatedPost);

      yield firestore
        .collection("posts")
        .doc(id)
        .update(updatedPost);

      return id;
    }),

    deleteDraftPost: flow(function* deleteDraftPost(id) {
      // @ts-ignore
      const post = yield self.getPost(id);

      if (post.published) {
        throw new Error(`Couldn't delete published post`);
      }

      yield firestore
        .collection("posts")
        .doc(id)
        .delete();

      self.posts.delete(id);

      return id;
    }),

    publishPost: flow(function* publishPost(id) {
      // @ts-ignore
      const post = yield self.getPost(id);

      const now = Date.now();

      const content = {
        ...post.draft,
        changed: now
      };

      const updatedPost = {
        ...post,
        changed: now,
        status: PostStatus.Published,
        draft: {
          ...content
        },
        published: {
          ...content
        }
      };

      yield firestore
        .collection("posts")
        .doc(id)
        .update(updatedPost);

      self.posts.set(id, updatedPost);

      return updatedPost;
    }),

    unpublishPost: flow(function* unpublishPost(id) {
      // @ts-ignore
      const post = yield self.getPost(id);

      const now = Date.now();

      const updatedPost = {
        ...post,
        changed: now,
        status: PostStatus.Draft,
        draft: {
          ...post.draft,
          changed: now
        },
        published: null
      };

      yield firestore
        .collection("posts")
        .doc(id)
        .update(updatedPost);

      self.posts.set(id, updatedPost);

      return updatedPost;
    }),

    discardDraftChanges: flow(function* discardDraftChanges(id) {
      // @ts-ignore
      const post = yield self.getPost(id);

      const updatedPost = {
        ...post,
        status: PostStatus.Published,
        draft: post.published,
        published: post.published
      };

      yield firestore
        .collection("posts")
        .doc(id)
        .update(updatedPost);

      self.posts.set(id, updatedPost);

      return updatedPost;
    }),

    verifyDraftIsValid: flow(function* verifyDraftIsValid(id) {
      // @ts-ignore
      const post = yield self.getPost(id);
      const draft = post.draft;
      const meta = post.draft.meta;

      if (
        !draft.title ||
        !draft.text ||
        !meta ||
        !meta.url ||
        !meta.language ||
        !meta.author ||
        !meta.category ||
        !meta.date ||
        !meta.thumbImage ||
        !meta.thumbText ||
        !meta.thumbText
      ) {
        return false;
      }

      return true;
    }),

    copyPost: flow(function* copyPost(copyId) {
      // @ts-ignore
      const post = yield self.getPost(copyId);

      const newDraftRef = firestore.collection("posts").doc();
      const id = newDraftRef.id;
      const now = moment.now();

      const newPost = {
        id,
        changed: now,
        status: PostStatus.Draft,
        draft: {
          ...post.draft,
          title: `${post.draft.title} (Copy)`,
          changed: now
        }
      };

      // @ts-ignore
      self.posts.set(id, newPost);

      yield newDraftRef.set(newPost);

      return id;
    })
  }));
