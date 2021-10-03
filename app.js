const express = require("express");
const expressHbs = require("express-handlebars");
const hbs = require("hbs");
const app = express();


//определение пути
const path = require('path');
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

//определяем роутеры
const homeRouter = require("./routes/homeRouter");
const clientRouter = require("./routes/clientRouter");
const passesRouter = require("./routes/passesRouter");
const passtypesRouter = require("./routes/passtypesRouter");
const incomeRouter = require("./routes/incomeRouter");
const expencesRouter = require("./routes/expencesRouter");
const projectsRouter = require("./routes/projectsRouter");
const analyticsRouter = require("./routes/analyticsRouter");

//используем роутеры
app.use("/passtypes", passtypesRouter);
app.use("/income", incomeRouter);
app.use("/expences", expencesRouter);
app.use("/projects", projectsRouter);
app.use("/passes", passesRouter);
app.use("/clients", clientRouter);
app.use("/analytics", analyticsRouter);
app.use("/", homeRouter);

//слушаем порт
app.listen(process.env.PORT || 3000, function(){
    console.log("Сервер ожидает подключения...");
});