const express = require("express");
const path = require("path");
const preloadables = require("./preloadables");
const app = express();
const port = process.env.PORT || process.env.port || 2022;

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("pages/home", {
    preloadables,
  });
});
app.get("/work", (req, res) => {
  res.render("pages/work", {
    preloadables,
  });
});
app.get("/about", (req, res) => {
  res.render("pages/about", {
    preloadables,
  });
});
app.get("/projects", (req, res) => {
  res.render("pages/projects", {
    preloadables,
  });
});
// Redirect old playground URL to projects
app.get("/playground", (req, res) => {
  res.redirect(301, "/projects");
});
app.get("/contact", (req, res) => {
  res.render("pages/contact", {
    preloadables,
  });
});
app.get("/:invalid", (req, res) => {
  res.redirect("/");
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(
      `\x1b[32m Server listening at\x1b[0m`,
      `\x1b[4mhttp://localhost:${port}\x1b[0m`
    );
  });
}

module.exports = app;
