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

//создаем промис для запросов
const query = function (sqlQuery, arg) {
    return new Promise(function (resolve, reject) {
        pool.query(sqlQuery, arg, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

exports.getAnalytics = function (request, response) {
    response.render("analytics.hbs", {
        title: "Аналитика",
    });
};
