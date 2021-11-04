const express = require('express'),
    expressHbs = require('express-handlebars'),
    hbs = require('hbs'),
    app = express(),
    session = require('express-session'),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    flash = require('connect-flash'),
    path = require('path');

const homeRouter = require("./routes/homeRouter"),
    clientRouter = require("./routes/clientRouter"),
    passesRouter = require("./routes/passesRouter"),
    passtypesRouter = require("./routes/passtypesRouter"),
    incomeRouter = require("./routes/incomeRouter"),
    expencesRouter = require("./routes/expencesRouter"),
    projectsRouter = require('./routes/projectsRouter'),
    analyticsRouter = require("./routes/analyticsRouter"),
    authRouter = require('./routes/authRouter');


//определение пути
app.use('/static', express.static(path.join(__dirname, 'public')));

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

//подключаем express модули
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: true,
    }))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

//авторизация
passport.use(
    new localStrategy(
        {
            usernameField: 'user',
            passwordField: 'password',
        },
        (user, password, done) => {
        if (user !== 'tu')
            return done(null, false, {
                message: 'User not found',
            })
        else if (password !== 'tp')
            return done(null, false, {
                message: 'Wrong password',
            })
        return done(null, {id: 1, name: 'test', age: 21})
    })
)

app.get('/login', (req, res) => {
    console.log('Flash: ', req.flash('message'));
    res.render('login');
})

app.use((req, res, next) => {
    if (req.user) next()
    else res.redirect('/login')
})

app.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/home',
        failureFlash: true
    })
);

app.get('/home', checkAuth(), (req, res) => {
    res.send("Home page. You're authorized.")
});

//Define routers
app.use('/passtypes', passtypesRouter);
app.use('/income', incomeRouter);
app.use('/expences', expencesRouter);
app.use('/projects', projectsRouter);
app.use('/passes', passesRouter);
app.use('/clients', clientRouter);
app.use('/analytics', analyticsRouter);
app.use('/', authRouter);
app.use('/', homeRouter);

//авторизация
function checkAuth() {
    return app.use((req, res, next) => {
        if (req.user) next()
        else res.redirect('/login')
    })
}

//слушаем порт
app.listen(process.env.PORT || 3000, function(){
    console.log("Сервер ожидает подключения...");
});

module.exports = app;