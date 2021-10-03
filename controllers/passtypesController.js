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

exports.getPasstypes = function (request, response) {
    pool.query("SELECT * FROM passtypes", function (error, data) {
        if (error) {
            console.log(error);
        }
        response.render("passtypes.hbs", {
            passtypes: data,
            title: "Типы абонементов",
        });
    });
};

exports.newPasstype = function (request, response) {
    let button1 = {
        action : "/passtypes/create",
        name : "Создать",
    };
    let button2 = {
        action : "/passtypes",
        name : "Отмена",
    };
    response.render("newpasstype", {
        button1,
        button2,
        title: "Новый тип абонемента",
    });
};

exports.createPasstype = function (request, response) {
    const type = request.query.type;
    const amount = request.query.amount;
    const week = request.query.week;
    const cost = request.query.cost;
    pool.query("INSERT INTO passtypes (Type, Amount, Week, Cost) VALUES (?,?,?,?)", [type, amount, week, cost], function(error, data) {
        if(error) {
            console.log(error);
            return response.redirect("back");
        }
        console.log(`Add passtype ${type} succesful`)
        response.redirect("/passtypes");
    });
};

exports.getPasstype = function (request, response) {
    const id = request.params.idPassType;
    pool.query("SELECT * FROM passtypes WHERE idPassType = (?)", [id], function (err, result) {
        if (err) {
            console.log(err);
        }
        result = JSON.parse(JSON.stringify(result[0]));
        let button1 = {
            action : "/passtypes/update",
            name : "Редактировать",
        };
        let button2 = {
            action : "/passtypes/delete",
            name : "Удалить",
        };
        console.log(result);
        response.render("newpasstype", {
            passtype: result,
            title: "Тип абонемента",
            button1,
            button2,
        });
    });
};

exports.updatePasstype = function (request, response) {
    const id = request.body.id;
    const type = request.body.type;
    const amount = request.body.amount;
    const week = request.body.week;
    const cost = request.body.cost;
    const values = [
        type, amount, week, cost, id
    ];
    pool.query("UPDATE passtypes SET Type = (?), Amount = (?), Week = (?), Cost = (?) WHERE idPassType = (?)", values, function (err, data){
        if (err) {
            console.log(err);
            response.redirect("back");
        }
        console.log(`Update passtype ${values} sucsessful`);
        response.redirect(`/passtypes/${id}`);
    });
};

exports.deletePasstype = function (request, response) {
    const id = request.params.idPassType;
    pool.query('DELETE FROM passtypes WHERE idPasstype = (?)', [id], function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log(`Delete passtype with id ${id} succesful`);
    });
    response.redirect('/passtypes');
};