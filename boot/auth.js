const passport = require('passport'),
    Strategy = require('passport-local'),
    crypto = require('crypto'),
    model = require('../boot/db.js');

const functions = require("../public/javascripts/functions.js"),
    transformData = functions.transformData;

module.exports = function() {

    // Configure the local strategy for use by Passport.
    //
    // The local strategy requires a `verify` function which receives the credentials
    // (`username` and `password`) submitted by the user.  The function must verify
    // that the password is correct and then invoke `cb` with a user object, which
    // will be set at `req.user` in route handlers after authentication.
    passport.use(new Strategy(async function(username, password, cb) {
        try {
            let row = await model.user.findAll({
                where: {
                    userName: username
                }
            });
            row = transformData(row);
            row = row[0];

            if (!row) {
                console.log('User not found');
                return cb(null, false, {message: 'User not found'})
            }
            if (+row.password !== password) {
                console.log('Password incorrect');
                return cb(null, false, {message: 'Incorrect password'})
            }
            console.log('HI');
            const user = {
                id: row.idUser,
                username: row.userName
            };
            return cb(null, user);
        } catch (err) {
            console.log(err);
        }
    }));



    // Configure Passport authenticated session persistence.
    //
    // In order to restore authentication state across HTTP requests, Passport needs
    // to serialize users into and deserialize users out of the session.  The
    // typical implementation of this is as simple as supplying the user ID when
    // serializing, and querying the user record by ID from the database when
    // deserializing.
    passport.serializeUser(function(user, cb) {
        process.nextTick(function() {
            cb(null, { id: user.id, username: user.username });
        });
    });

    passport.deserializeUser(function(user, cb) {
        process.nextTick(function() {
            return cb(null, user);
        });
    });

};