//подгружаем драйвер mySQL
const mysql = require("mysql2");

//подгружаем вспомогательные функции и переменные
const functions = require("../public/javascripts/functions.js");
const query = functions.query;
const pool = functions.pool;

exports.getExpences = function (request, response) {
    let query1 = query('SELECT * FROM expences');
    let query2 = query('SELECT * FROM expencestypes');
    Promise.all([query1, query2]).then(function (result) {
        let expences = JSON.parse(JSON.stringify(result[0]));
        let types = JSON.parse(JSON.stringify(result[1]));
        expences = expences.map(item => {
            let idType = item.Type;
            item.Type = types.find(item => item.idExpencesTypes === idType).Type;
            item.Date = functions.transformDate(item.Date);
            return item
        });
        response.render("expences", {
            title: "Расходы",
            expences,
            types,
        });
    });
};

exports.getExpencesTypes = function (request, response) {
    pool.query('SELECT * FROM expencestypes', function (error, result) {
        if (error) {
            console.log(error);
        }
        let types = JSON.parse(JSON.stringify(result));
        console.log(types);
        response.render('expencestypes', {
            title: 'Типы расходов',
            types,
        });
    });
};

exports.createExpencesType = function (request, response) {
    let type = request.query.type;
    pool.query('INSERT INTO expencestypes (Type) VALUES (?)', [type], function (err, result) {
        if (err) {
            console.log(err);
        }
        response.redirect('/expences/types');
    });
};

exports.createExpence = function (request, response) {
    let type = request.query.type;
    let date = request.query.date;
    let cost = request.query.cost;
    let info = request.query.info;
    pool.query('INSERT INTO expences (Type, Date, Cost, Info) VALUES (?,?,?,?)', [type, date, cost, info], function (error, result) {
        if (error) {
            console.log(error);
        }
        response.redirect('/expences');
    });
};



