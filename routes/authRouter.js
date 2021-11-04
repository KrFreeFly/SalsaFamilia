const express = require('express'),
    passport = require('passport');

const authRouter = express.Router();

authRouter.get('/login', function (req, res, next) {
    res.render('login');
});

authRouter.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true
}));

authRouter.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = authRouter;