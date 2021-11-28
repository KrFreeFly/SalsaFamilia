const express = require('express'),
    expressHbs = require('express-handlebars'),
    hbs = require('hbs'),
    app = express(),
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
app.use(express.static('./public'));

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
const port = (process.env.PORT || 3000)
app.listen(port, ()=>{
    console.log(`Connection opened on port ${port}`);
});

module.exports = app;