import { types, flow, getParent } from "mobx-state-tree";
import { firestore } from "./firebaseInit";

export const Author = types.model("Author", {
  id: types.identifier(),
  name: types.string,
  avatar: types.string,
  description: types.string
});

export const AuthorsStore = types
  .model("AuthorsStore", {
    authors: types.map(Author)
  })
  .views(self => ({
    get blog() {
      return getParent(self);
    },
    get allAuthors() {
      return self.authors.values();
    },
    get currentAuthor() {
      if (!self.blog.auth.isAuthor || !self.blog.auth.user) {
        return null;
      }
      const authorName = self.blog.auth.user.authorName;
      return self.allAuthors.find(author => author.id === authorName) || null;
    }
  }));
