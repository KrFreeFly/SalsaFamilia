exports.transformDate = function (rawDate) {
    let correctDate = new Date(rawDate);
    return `${correctDate.getDate()}.${correctDate.getMonth()+1}.${correctDate.getFullYear()}`
}

exports.query = function (sqlQuery, arg) {
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

exports.mysql
exports.pool