const express = require('express')
const router = express.Router()

const login = require('../controllers/loginController')

router.route('/')
    .get((req, res) => {
        res.render('login');
    })
    .post(login)

module.exports = router