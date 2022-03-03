import express from "express";
import expressHbs from "express-handlebars";
import hbs from "hbs";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import history from 'connect-history-api-fallback';
import { authMidWare } from "./middleware/auth.js";
import loginRouter from "./routes/loginRouter.js";
import mainRouter from "./routes/mainRouter.js";
import apiV1Router from "./src/api/routes/index.js";

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

//конфигурируем handlebars
app.engine("hbs", expressHbs(
    {
        layoutsDir: "./views/layouts",
        defaultLayout: "layout",
        extname: "hbs"
    }
));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, 'views' , 'partials'));

history({
    index: './dist/index.html',
})

//Application-level middleware
app.use(history());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
app.use('/public', express.static('./public'));
app.use('/src', express.static('./src'));
app.use(express.static('./dist'));

app.get('/', (req, res) => {
    res.sendFile('./dist/index.html');
});

//Define routes
//app.use('/login', loginRouter)
//app.use('/', authMidWare)
//app.use('/api/v1', apiV1Router)
//app.use('/', mainRouter);

//слушаем порт
const port = process.env.PORT

const start = () => {
    app.listen(port, ()=>{
        console.log(`Connection opened on port ${port}`);
    });
}

start()

export default app;

//TODO: in all controllers replace try/catch with wrapping function and errorhandler

//TODO: create a route and controller for classes (groups, personal, rented)

//TODO: create a calendar for all classes (table, router, controller, page, etc.)
