const express = require("express");
const passtypesController = require("../controllers/passtypesController");
const passtypesRouter = express.Router();

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

passtypesRouter.post("/", urlencodedParser, passtypesController.createPasstype);
passtypesRouter.put("/:idPassType", urlencodedParser, passtypesController.updatePasstype);
passtypesRouter.delete("/:idPassType", urlencodedParser, passtypesController.deletePasstype);
passtypesRouter.get("/", passtypesController.getPasstypes);

module.exports = passtypesRouter;