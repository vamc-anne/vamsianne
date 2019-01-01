const expressJS = require("express");
const router = expressJS.Router();

const { enableProdMode } = require("@angular/core");
const { renderModuleFactory } = require("@angular/platform-server");
const {
  provideModuleMap
} = require("@nguniversal/module-map-ngfactory-loader");
const path = require("path");
// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP
} = require("./server/main.bundle");

// Faster server renders w/ Prod mode (dev mode never needed)

const index = require("fs")
  .readFileSync(path.resolve(__dirname, "./index.html"), "utf8")
  .toString();
const appIndex = db => {
  router.get("/", (req, resp) => {
    console.log("is every request coming here?");
    renderModuleFactory(AppServerModuleNgFactory, {
      document: index,
      url: "/",
      extraProviders: [provideModuleMap(LAZY_MODULE_MAP)]
    })
      .then(function(html) {
        resp.send(html);
      })
      .catch(function(e) {
        console.log(e);
      });
  });
  return router;
};

module.exports = appIndex;
