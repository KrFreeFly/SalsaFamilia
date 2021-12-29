const express = require("express");
const projectsController = require("../controllers/projectsController");
const projectsRouter = express.Router();

projectsRouter.use("/", projectsController.getProjects);

module.exports = projectsRouter;