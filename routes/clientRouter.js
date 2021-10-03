const express = require("express");
const clientController = require("../controllers/clientController.js");
const clientRouter = express.Router();

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

//clientRouter.use("/fix", clientController.fixTable);
clientRouter.use("/delete", urlencodedParser, clientController.deleteClient);
clientRouter.use("/clientcard", clientController.newClient);
clientRouter.use("/create", urlencodedParser, clientController.createClient);
clientRouter.use("/update", urlencodedParser, clientController.updateClient);
clientRouter.use("/clientsFilter", urlencodedParser, clientController.clientsFilter);
clientRouter.use("/:idClients", clientController.getClientcard);
clientRouter.use("/", clientController.getClients);

module.exports = clientRouter;