const express = require("express");
const clientController = require("../controllers/clientController.js");
const clientRouter = express.Router();

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: true});

clientRouter.post("/delete", urlencodedParser, clientController.deleteClient);
clientRouter.get("/clientcard", clientController.newClient);
clientRouter.post("/create", urlencodedParser, clientController.createClient);
clientRouter.post("/update", urlencodedParser, clientController.updateClient);
clientRouter.post("/clientsFilter", urlencodedParser, clientController.clientsFilter);
clientRouter.get("/:idClients", clientController.getClientcard);
clientRouter.get("/", clientController.getClients);

module.exports = clientRouter;