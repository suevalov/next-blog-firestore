// @ts-check

import { types, getParent } from "mobx-state-tree";

export const Language = types.model({
  id: types.string,
  title: types.string,
  shortTitle: types.string,
});

export const UIStore = types
  .model("UIStore", {
    collapsedSidebar: false,
    languages: types.map(Language)
  })
  .views(self => ({
    get blog() {
      return getParent(self);
    },
    get allLanguages() {
      return self.languages.values();
    }
  }))
  .actions(self => ({
    toggleSidebar() {
      self.collapsedSidebar = !self.collapsedSidebar;
    },
    closeSidebar() {
      self.collapsedSidebar = false;
    },
    openSidebar() {
      self.collapsedSidebar = true;
    }
  }));
