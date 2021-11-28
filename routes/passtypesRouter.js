const express = require("express");
const passtypesController = require("../controllers/passtypesController");
const passtypesRouter = express.Router();

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

passtypesRouter.use("/newpasstype", passtypesController.newPasstype);
passtypesRouter.use("/create", urlencodedParser, passtypesController.createPasstype);
passtypesRouter.use("/update", urlencodedParser, passtypesController.updatePasstype);
passtypesRouter.use("/delete:idPassType", urlencodedParser, passtypesController.deletePasstype);
passtypesRouter.use("/:idPassType", passtypesController.getPasstype);
passtypesRouter.get("/", passtypesController.getPasstypes);

module.exports = passtypesRouter;