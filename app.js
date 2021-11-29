const express = require('express'),
    expressHbs = require('express-handlebars'),
    hbs = require('hbs'),
    app = express(),
    logger = require('morgan');

const router = require("./routes/mainRouter")

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
app.use('/', router);

//слушаем порт
const port = (process.env.PORT || 3000)
app.listen(port, ()=>{
    console.log(`Connection opened on port ${port}`);
});

module.exports = app;