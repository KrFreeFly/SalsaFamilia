const express = require('express'),
    passport = require('passport');

const authRouter = express.Router();

authRouter.get('/loginRouter', function (req, res, next) {
    res.render('login');
});

authRouter.post('/loginRouter/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/loginRouter',
    failureMessage: true
}));

authRouter.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = authRouter;