//подгружаем драйвер mySQL
const mysql = require("mysql2");

//подгружаем вспомогательные функции
const functions = require("../public/javascripts/functions.js");

//подгружаем промис для запросов
import {query} from '../public/javascripts/functions.js';

//создаем пул подключений к базе данных
const pool = mysql.createPool({
    connectionLimit: 5,
    host: "sql11.freemysqlhosting.net",
    user: "sql11440439",
    database: "sql11440439",
    password: "9XLN1AfatB"
});

exports.getIncome = function (require, response) {
    const query1 = query('SELECT * FROM income');
    const query2 = query('SELECT * FROM incometypes');
    Promise.all([query1, query2]).then(function (result) {
        let income = JSON.parse(JSON.stringify(result[0]));
        let types = JSON.parse(JSON.stringify(result[1]));
        income = income.map(item => {
            let idType = item.ID_IncomeTypes;
            item.Type = types.find(item => item.idIncomeTypes === idType).Type;
            item.Date = functions.transformDate(item.Date);
            return item
        });
        response.render("income", {
            title: "Доходы",
            income,
            types,
        });
    });
};

exports.getIncomeTypes = function (require, response) {
    pool.query('SELECT * FROM incometypes', function (err, result) {
        if (err) {
            console.log(err);
        }
        let types = JSON.parse(JSON.stringify(result));
        console.log(types);
        response.render("incometypes", {
            title: 'Типы доходов',
            types,
        });
    });
};

exports.createIncomeType = function (request, response) {
    let type = request.query.type;
    pool.query('INSERT INTO incometypes (Type) VALUES (?)', [type], function (err, result) {
        if (err) {
            console.log(err);
        }
        response.redirect('/income/types');
    });
};

exports.createIncome = function (request, response) {
    let type = request.query.type;
    let date = request.query.date;
    let sum = request.query.sum;
    let info = request.query.info;
    pool.query('INSERT INTO income (ID_IncomeTypes, Date, Sum, Info) VALUES (?,?,?,?)', [type, date, sum, info], function (error, result) {
        if (error) {
            console.log(error);
        }
        response.redirect('/income');
    });
};
