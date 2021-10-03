const express = require("express");
const expencesController = require("../controllers/expencesController");
const expencesRouter = express.Router();

expencesRouter.use('/types/create', expencesController.createExpencesType);
expencesRouter.get('/types', expencesController.getExpencesTypes);
expencesRouter.use('/create', expencesController.createExpence);
expencesRouter.get("/", expencesController.getExpences);

module.exports = expencesRouter;