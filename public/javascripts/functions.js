//подгружаем драйвер PostgreSQL
const { Pool } = require('pg');

//создаем пул подключений к базе данных
const pool = new Pool({
    max: 5,
    host: 'ec2-52-30-81-192.eu-west-1.compute.amazonaws.com',
    user: 'nrixcjoqurpngb',
    database: 'd8blcg87f3fr65',
    password: '9cbf6cc54df797570cc01fd3f6c178fbb9d4c9789888aa6267d0bcd41ee0b41f',
    ssl: {
        rejectUnauthorized: false
    },
});

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