const db = require("../db/queries");

async function getTypeList(req, res) {
  const typeList = await db.getAllTypes();
  res.render("type", { types: typeList });
}

async function getNewType(req, res) {
  res.render("newType");
}

async function postNewType(req, res) {
  const { name } = req.body;
  await db.insertType(name);
  res.redirect("/type");
}

module.exports = {
  getTypeList,
  getNewType,
  postNewType,
};
