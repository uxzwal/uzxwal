const express = require("express");
const path = require("path");
const preloadables = require("./preloadables");

const app = express();
const port = Number(process.env.PORT) || 2022;

app.set("trust proxy", true);
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

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
app.get("/playground", (req, res) => {
  res.render("pages/playground", {
    preloadables,
  });
});
app.get("/contact", (req, res) => {
  res.render("pages/contact", {
    preloadables,
  });
});
app.get("/:invalid", (req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  console.log(
    `\x1b[32mServer listening at\x1b[0m`,
    `\x1b[4mhttp://0.0.0.0:${port}\x1b[0m`
  );
});

module.exports = app;
