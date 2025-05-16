const { Router } = require("express");
const typeController = require("../controllers/typeController");
const typeRouter = Router();

typeRouter.get("/", typeController.getTypeList);
typeRouter.get("/new", typeController.getNewType);
typeRouter.post("/new", typeController.postNewType);

module.exports = typeRouter;
