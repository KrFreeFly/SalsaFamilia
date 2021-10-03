//подгружаем драйвер mySQL
const mysql = require("mysql2");

//подгружаем вспомогательные функции
const functions = require("../public/javascripts/functions.js");
const query = functions.query;

//отрисовка главной страницы
exports.index =  function(req, res) {
    res.render("index.hbs", {
        title : "База данных Salsa Familia",
    });
};