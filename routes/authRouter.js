const express = require('express')
const router = express.Router();



router.post('/loginRouter/password', (req, res) => {
    res.end
});

router.get('/logout', function (req, res) {
    res.redirect('/');
});

module.exports = router;