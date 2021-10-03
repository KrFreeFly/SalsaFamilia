const express = require("express");
const passesController = require("../controllers/passesController.js");
const passesRouter = express.Router();

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

passesRouter.use("/create", urlencodedParser, passesController.createPass);
passesRouter.use("/edit", passesController.editPass);
passesRouter.use("/delete", passesController.deletePass);
passesRouter.use("/newpass", urlencodedParser, passesController.newPass);
passesRouter.use("/:idPasses", passesController.getPass);
passesRouter.use("/", passesController.getPasses);

module.exports = passesRouter;