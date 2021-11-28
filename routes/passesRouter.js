const express = require("express");
const passesController = require("../controllers/passesController.js");
const passesRouter = express.Router();

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

passesRouter.use("/create", urlencodedParser, passesController.createPass);
passesRouter.use("/edit", passesController.editPass);
passesRouter.use("/delete", passesController.deletePass);
passesRouter.get('/newpass', urlencodedParser, passesController.newPass);
passesRouter.get("/:idPasses", passesController.getPass);
passesRouter.get('/', passesController.getPasses);

module.exports = passesRouter;