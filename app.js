const express = require('express'),
    expressHbs = require('express-handlebars'),
    hbs = require('hbs'),
    app = express(),
    morgan = require('morgan'),
    authMidWare = require('./middleware/auth'),
    loginRouter = require('./routes/loginRouter'),
    cookieParser = require('cookie-parser');

const mainRouter = require('./routes/mainRouter')

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
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
app.use(express.static('./public'));

//Define routes
app.use('/login', loginRouter)
app.use('/',authMidWare)
app.use('/', mainRouter);

//слушаем порт
const port = process.env.PORT

let start = ()=> {
    app.listen(port, ()=>{
        console.log(`Connection opened on port ${port}`);
    });
}

start()

module.exports = app;

//TODO: in all controllers replace try/catch with wrapping function and errorhandler

//TODO: create a route and controller for classes (groups, personal, rented)

//TODO: create a calendar for all classes (table, router, controller, page, etc.)