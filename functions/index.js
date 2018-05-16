// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
//http://localhost:5000/vamsianne-91b98/us-central1/api/
const functions = require("firebase-functions");
const expressJS = require("express");
const authKeys = require("./cloudServiceKeys.json");
const cors = require("cors");

// These are important and needed before anything else
require("zone.js/dist/zone-node");
global["XMLHttpRequest"] = require("xmlhttprequest").XMLHttpRequest;
const admin = require("firebase-admin");

const app = expressJS();
app.use(cors());
admin.initializeApp(functions.config().firebase);

var db = admin.firestore();

const articlesRouter = require("./services/articles/articles.service")(db);
const coreRouter = require("./services/core/core.service")(db);

app.use("/articles", articlesRouter);
app.use("/core", coreRouter);

const api = functions.https.onRequest(app);

module.exports = {
  api
};
