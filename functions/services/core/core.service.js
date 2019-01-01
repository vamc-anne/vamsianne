const expressJS = require("express");
const router = expressJS.Router();
const core = db => {
  let contacts = db.collection("contacts");
  let portfolio = db.collection("portfolio");

  router.post("/addContact", (req, resp) => {
    const contacts = Object.assign({}, req.body, {
      didContact: false,
      subscribed: true
    });
    contacts.add(contacts).then(contact => {
      resp.send(contact);
    });
  });

  router.get("/portfolio", (req, resp) => {
    const pfList = [];
    portfolio
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          pfList.push(doc.data());
        });
        resp.send(pfList);
      })
      .catch(err => {
        resp.send(err);
      });
  });

  return router;
};

module.exports = core;
