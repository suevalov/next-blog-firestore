// @ts-check

import { types, flow, addDisposer, getParent } from "mobx-state-tree";
import { firebase, firestore, auth as fireauth } from "./firebaseInit";

export const User = types.model("User", {
  uid: types.identifier(),
  authorName: types.string,
  emailVerified: types.boolean,
  phoneNumber: types.maybe(types.string),
  displayName: types.maybe(types.string),
  photoURL: types.maybe(types.string),
  email: types.maybe(types.string),
  isAnonymous: types.boolean
});

export const AuthStore = types
  .model(`AuthStore`, {
    user: types.optional(types.union(User, types.literal(null)), null),
    isUserPending: types.boolean,
    isAuthor: types.boolean
  })
  .views(self => ({
    get blog() {
      return getParent(self);
    },
    get isAuthenticated() {
      return self.user !== null && self.isAuthor;
    }
  }))
  .actions(self => ({
    subscribe() {
      const onAuthStateChanged = user => {
        if (user) {
          self.verifyIfUserIsAuthor(user).then(authorName => {
            if (authorName) {
              self.setUser(user, authorName);
            } else {
              self.setUser(null, null);
            }
          });
        } else {
          // @ts-ignore
          self.setUser(null, null);
        }
      };
      const disposer = fireauth.onAuthStateChanged(onAuthStateChanged);
      addDisposer(self, disposer);
    },

    verifyIfUserIsAuthor: flow(function* verifyIfUserIsAuthor(user) {
      if (!user) {
        return null;
      }
      try {
        const doc = yield firestore
          .collection("authors")
          .doc(user.uid)
          .get();
        if (!doc.exists) {
          return null;
        }
        return doc.data().name;
      } catch (e) {
        return null;
      }
    }),

    setUser(user, authorName) {
      self.isUserPending = false;
      self.isAuthor = !!authorName;
      if (user) {
        self.user = {
          uid: user.uid,
          authorName: authorName,
          emailVerified: user.emailVerified,
          phoneNumber: user.phoneNumber,
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
          isAnonymous: user.isAnonymous
        };
      } else {
        self.user = null;
      }
    },

    signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      return fireauth.signInWithPopup(provider);
    },

    signOut() {
      fireauth.signOut();
    }
  }));
