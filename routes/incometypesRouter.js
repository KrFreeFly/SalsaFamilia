const express = require("express");
const incometypesController = require("../controllers/incometypesController");
const incometypesRouter = express.Router();

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

incometypesRouter.post('/', urlencodedParser, incometypesController.createIncomeType);
incometypesRouter.put('/:idIncomeType', urlencodedParser, incometypesController.updateIncomeType);
incometypesRouter.delete('/:idIncomeType', urlencodedParser, incometypesController.deleteIncomeType);
incometypesRouter.get('/', incometypesController.getIncomeTypes);

module.exports = incometypesRouter;