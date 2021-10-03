const express = require("express");
const projectsController = require("../controllers/projectsController");
const projectsRouter = express.Router();

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

projectsRouter.use("/", projectsController.getProjects);

module.exports = projectsRouter;