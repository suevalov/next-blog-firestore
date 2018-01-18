const routes = (module.exports = require("next-routes")());

routes
  .add({ name: "index", pattern: "/", page: "index" })
  .add({ name: "category", pattern: "/categories/:category", page: "category" })
  .add({ name: "tag", pattern: "/tags/:tag", page: "tag" })
  .add({ name: "author", pattern: "/authors/:author", page: "author" })
  .add({ name: "preview", pattern: "/preview", page: "preview" })
  .add({ name: "admin", pattern: "/admin", page: "admin/index" })
  .add({
    name: "adminSettings",
    pattern: "/admin/settings",
    page: "admin/settings"
  })
  .add({ name: "adminLogin", pattern: "/admin/login", page: "admin/login" })
  .add({ name: "adminEditor", pattern: "/admin/editor", page: "admin/editor" });
