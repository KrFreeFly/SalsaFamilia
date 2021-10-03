//подгружаем драйвер mySQL
const mysql = require('mysql2');

//подгружаем вспомогательные функции
const functions = require("../public/javascripts/functions.js");

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
}

//вывод списка всех абонементов
exports.getPasses = function (request, response) {
    let query1 = query('SELECT * FROM passes');
    let query2 = query('SELECT idClients, Name, Surname FROM clients');
    let query3 = query('SELECT idPassType, Type FROM passtypes');
    Promise.all([query1, query2, query3]).then(function (result) {
        let passtypes = Array.from(JSON.parse(JSON.stringify(result[2])));
        let clients = Array.from(JSON.parse(JSON.stringify(result[1])));
        let passes = Array.from(JSON.parse(JSON.stringify(result[0])));
        passes = passes.map(item => {
            let idClient = item.ID_Client;
            let idPassType = item.ID_PassTypes
            let client = clients.find(item => item.idClients === idClient);
            item.Name = client.Name;
            item.Surname = client.Surname;
            item.Passtype = passtypes.find(item => item.idPassType === idPassType).Type;
            item.DateStart = functions.transformDate(item.DateStart);
            item.DateEnd = functions.transformDate(item.DateEnd);
            return item;
        });
        console.log(passes);
        response.render('passes.hbs', {
            passes,
            title: 'Список абонементов',
        });
    });
};

//вывод формы создания абонемента
exports.newPass = function (request, response) {
    let client;
    if (request.body.id) {
        client = {
            id: request.body.id,
            name: request.body.name,
            surname: request.body.surname,
        }
    }
    const query1 = query("SELECT idClients, Name, Surname FROM clients ORDER BY Surname");
    const query2 = query('SELECT idPassType, Type FROM passtypes');
    Promise.all([query1, query2]).then(function (result) {
        let clients = JSON.parse(JSON.stringify(result[0]));
        let passtypes = JSON.parse(JSON.stringify(result[1]));
        console.log(clients, passtypes);
        let button1 = {
            action : "/passes/create",
            name : "Создать",
        };
        let button2 = {
            action : "javascript:history.go(-1)",
            name : "Отмена",
        }
        response.render("pass", {
            title: 'Создание нового абонемента',
            button1,
            button2,
            passtypes,
            clients,
            client,
        });
    });
};

//отправка данных нового абонемента в базу данных
exports.createPass = function (request, response) {
    let idClient = request.body.idClient;
    let idPassType = request.body.idPassType;
    let startDate = new Date(request.body.startDate);
    pool.query("SELECT Amount, Week, Cost FROM passtypes WHERE idPassType = (?)", [idPassType], function (err, result) {
        if (err) {
            console.log(err);
        }
        result = JSON.parse(JSON.stringify(result[0]))
        let endDate = new Date();
        endDate.setDate(startDate.getDate() + 7 * result.Week - 1);
        pool.query('INSERT INTO passes (ID_Client, ID_PassTypes, DateStart, DateEnd, ClassesLeft, Cost) VALUES (?, ?, ?, ?, ?, ?)', [idClient, idPassType, startDate, endDate, result.Amount, result.Cost], function (err, result) {
            if (err) {
                console.log(err);
            }
            console.log(result);
        })
    });
    response.redirect('/passes');
};

//вывод абонемента по его id
exports.getPass = function (request, response) {
    const id = request.params.idPasses;
    pool.query('SELECT * FROM passes WHERE idPasses = (?)', [id], function (err, result) {
        if (err) {
            console.log(err);
        }
        result = JSON.parse(JSON.stringify(result[0]));
        console.log(result);
        const query1 = query('SELECT Name, Surname FROM clients WHERE idClients = (?)', [result.ID_Client]);
        const query2 = query('SELECT Type FROM passtypes WHERE idPassType = (?)', [result.ID_PassTypes]);
        Promise.all([query1, query2]).then(function (result) {
            let pass = Array.from(JSON.parse(JSON.stringify(result)));
            console.log(pass);
            });
        });
    response.send('Not available');
};

//редактирование абонемента

exports.editPass = function (request, response) {

};

//удаление абонемента

exports.deletePass = function (request, response) {

};