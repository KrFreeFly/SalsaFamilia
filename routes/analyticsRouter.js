const express = require("express");
const analyticsController = require("../controllers/analyticsController");
const analyticsRouter = express.Router();

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

analyticsRouter.use("/", analyticsController.getAnalytics);

module.exports = analyticsRouter;