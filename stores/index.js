// @ts-check

import { types, flow } from "mobx-state-tree";
import { AuthStore } from "./authStore";
import { UIStore } from "./uiStore";
import { PostsStore } from "./postsStore";
import { AuthorsStore } from "./authorsStore";
import { CategoriesStore } from "./categoriesStore";
import { firestore } from "./firebaseInit";
import Config from "../utils/config";

export const BlogStore = types
  .model("BlogStore", {
    ui: types.optional(UIStore, {
      languages: Config.languages
    }),
    auth: types.optional(AuthStore, {
      user: null,
      isUserPending: true,
      isAuthor: false
    }),
    posts: types.optional(PostsStore, {
      posts: {},
      arePostsLoaded: false,
      sortBy: "newest",
      status: "all",
      author: "all",
      language: "all",
      category: "all"
    }),
    authors: types.optional(AuthorsStore, {
      authors: Config.authors
    }),
    categories: types.optional(CategoriesStore, {
      categories: {},
      areCategoriesLoaded: false
    })
  })
  .actions(self => ({
    backup: flow(function* backup() {
      const collections = ["posts", "categories"];
      const result = {};

      for (let i = 0; i < collections.length; i++) {
        const collectionId = collections[i];
        const collectionSnapshot = yield firestore
          .collection(collectionId)
          .get();
        const collectionData = [];
        collectionSnapshot.forEach(doc => {
          collectionData.push(doc.data());
        });
        result[collectionId] = collectionData;
      }

      return result;
    })
  }));
