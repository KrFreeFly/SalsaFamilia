//подгружаем драйвер mySQL
const mysql = require("mysql2");

//создаем пул подключений к базе данных
const pool = mysql.createPool({
    connectionLimit: 5,
    host: "sql11.freemysqlhosting.net",
    user: "sql11440439",
    database: "sql11440439",
    password: "9XLN1AfatB"
});

//подгружаем промис для запросов
import {query} from '../public/javascripts/functions.js';

exports.getProjects = function (require, response) {
    response.render("projects.hbs", {
        title: "Проекты",
    });
};
