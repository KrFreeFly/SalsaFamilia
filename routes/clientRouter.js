const express = require("express");
const clientController = require("../controllers/clientController.js");
const clientRouter = express.Router();

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

//clientRouter.delete("/delete", urlencodedParser, clientController.deleteClient);
//clientRouter.post("/clientcard", clientController.newClient);
clientRouter.get("/create", urlencodedParser, clientController.createClient);
clientRouter.use("/update", urlencodedParser, clientController.updateClient);
clientRouter.use("/clientsFilter", urlencodedParser, clientController.clientsFilter);
clientRouter.get("/:idClients", clientController.getClientcard);
clientRouter.get("/", clientController.getClients);

module.exports = clientRouter;