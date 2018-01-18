const express = require("express");
const { join } = require("path");
const next = require("next");
const serveStatic = require("serve-static");
const routes = require("./utils/routes");
const Config = require("./utils/config");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

const handler = routes.getRequestHandler(app, ({ req, res, route, query }) => {
  if (!query.lang) {
    query.lang = Config.defaultLanguage;
  }
  app.render(req, res, route.page, query);
});

app.prepare().then(() => {
  const server = express();

  server.use(
    serveStatic(join(__dirname, "static"), {
      maxAge: "30d"
    })
  );

  server.get("/posts/*", (req, res) => {
    app.render(req, res, "/post", {
      fullUrl: req.originalUrl
    });
  });

  server.use(handler);

  server.listen(port, err => {
    if (err) {
      throw err;
    }
    console.log("> Ready on http://localhost:3000");
  });
});
