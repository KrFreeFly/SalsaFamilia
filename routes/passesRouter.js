const express = require("express");
const passesController = require("../controllers/passesController.js");
const router = express.Router();

router.route('/')
    .get(passesController.getPasses)
    .post(passesController.createPass)

router.route('/newpass')
    .get(passesController.newPass)

router.route('/:idPasses')
    .get(passesController.getPass)
    .put(passesController.editPass)
    .delete(passesController.deletePass)

module.exports = router;