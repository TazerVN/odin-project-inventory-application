const { Router } = require("express");
const trainerController = require("../controllers/trainerController");
const trainerRouter = Router();

trainerRouter.get("/", trainerController.getTrainerList);

trainerRouter.get("/new", trainerController.getNewTrainer);
trainerRouter.post("/new", trainerController.postNewTrainer);

trainerRouter.post("/delete", trainerController.deleteTrainer);

module.exports = trainerRouter;
