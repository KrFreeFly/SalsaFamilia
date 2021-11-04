const express = require('express'),
    expressHbs = require('express-handlebars'),
    hbs = require('hbs'),
    app = express(),
    session = require('express-session'),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    flash = require('connect-flash'),
    path = require('path');
    logger = require('morgan');

const homeRouter = require("./routes/homeRouter"),
    authRouter = require('./routes/authRouter'),
    clientRouter = require("./routes/clientRouter"),
    passesRouter = require("./routes/passesRouter"),
    passtypesRouter = require("./routes/passtypesRouter"),
    incomeRouter = require("./routes/incomeRouter"),
    expencesRouter = require("./routes/expencesRouter"),
    projectsRouter = require('./routes/projectsRouter'),
    analyticsRouter = require("./routes/analyticsRouter");

//require('./boot/db')();
require('./boot/auth')();

//конфигурируем handlebars
app.engine("hbs", expressHbs(
    {
        layoutsDir: "views/layouts",
        defaultLayout: "layout",
        extname: "hbs"
    }
));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

//Application-level middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: false,
    }));
app.use(function(req, res, next) {
    const msgs = req.session.messages || [];
    res.locals.messages = msgs;
    res.locals.hasMessages = !! msgs.length;
    req.session.messages = [];
    next();
});
app.use(passport.initialize());
app.use(passport.authenticate('session'));

//Define routes
app.use('/', homeRouter);
app.use('/', authRouter);
app.use('/passtypes', passtypesRouter);
app.use('/income', incomeRouter);
app.use('/expences', expencesRouter);
app.use('/projects', projectsRouter);
app.use('/passes', passesRouter);
app.use('/clients', clientRouter);
app.use('/analytics', analyticsRouter);

//слушаем порт
app.listen(process.env.PORT || 3000, function(){
    console.log("Connection opened");
});

module.exports = app;