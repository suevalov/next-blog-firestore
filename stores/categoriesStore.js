// @ts-check

import { types, flow, getParent } from "mobx-state-tree";
import { firestore } from "./firebaseInit";

export const Category = types.model("Category", {
  id: types.identifier(),
  title: types.string
});

export const CategoriesStore = types
  .model("CategoriesStore", {
    categories: types.map(Category),
    areCategoriesLoaded: types.boolean
  })
  .views(self => ({
    get blog() {
      return getParent(self);
    },
    get allCategories() {
      return self.categories.values();
    }
  }))
  .actions(self => {
    const fetchCategories = flow(function* fetchCategories() {
      try {
        const querySnapshot = yield firestore.collection("categories").get();
        querySnapshot.forEach(doc => {
          const category = doc.data();
          self.categories.put(category);
        });
        self.areCategoriesLoaded = true;
      } catch (e) {}
    });

    return {
      fetchCategories
    };
  });
