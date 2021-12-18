const express = require("express");
const {getClients, getClientCard, newClient, clientsFilter, createClient, deleteClient, updateClient} = require("../controllers/clientController.js");
const router = express.Router();

router.post("/delete", deleteClient);
router.get("/clientcard", newClient);
router.post("/create", createClient);
router.post("/update", updateClient);
router.post("/clientsFilter", clientsFilter);
router.get("/:idClients", getClientCard);
router.get("/", getClients);

module.exports = router;