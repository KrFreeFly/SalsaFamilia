//подгружаем драйвер PostgreSQL
const { Pool } = require('pg');
const model = require('../models/salsafamilia.js')

//подгружаем вспомогательные функции
const functions = require("../public/javascripts/functions.js");
const query = functions.query;
const transformData = functions.transformData;

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

exports.getClients = async function(request, response) {
    let clients = await model.client.findAll({
        order: [['Surname', 'ASC']],
    });
    clients = transformData(clients);
    console.log(clients);
    response.render('clients', {
        clients
    });
}
/*
//возврат формы списка клиентов
exports.getClients = function(request, response) {
    pool.query('SELECT * FROM clients ORDER BY "Surname"', function(err, data) {
        if(err) {
            console.log(err);
            response.redirect('/');
        } else {
            response.render("clients", {
                clients: data.rows,
                title : "Список клиентов",
            });
        }
    });
};
*/


//возврат пустой карты клиента
exports.newClient = function(request, response) {
    let button1 = {
        action : "/clients/create",
        name : "Создать",
    };
    let button2 = {
        action : "/clients",
        name : "Отмена",
    };
    response.render("clientcard", {
        button1,
        button2,
        title: "Новый клиент",
    });
};

//отправка данных с формы создания клиента в БД
exports.createClient = function (request, response) {
    if(!request.body) return response.sendStatus(400);
    const name = request.body.name;
    const surname = request.body.surname;
    const cellphone = request.body.cellphone;
    const vk = request.body.vk;
    const insta = request.body.insta;
    const info = request.body.info;
    pool.query('INSERT INTO clients (Name, Surname, Cellphone, VK, Insta, Info) VALUES (?,?,?,?,?,?)', [name, surname, cellphone, vk, insta, info], function(err, data) {
        if(err) {
            console.log(err);
            return response.redirect("back");
        }
        console.log(`Add client ${surname} ${name} succesful`)
        response.redirect("/clients");
    });
};

// поиск клиента по фамилии
exports.clientsFilter = function (request, response) {
    if (!request.body) return response.sendStatus(400);
    const surname = request.body.filterSurname;
    pool.query('SELECT * FROM clients WHERE "Surname" = $1', [surname], function (err, data) {
        if (err) {
            console.log(err);
        } else {
            response.render("clients.hbs", {
                clients: data.rows,
                title: "Список клиентов",
            });
        }
    });
};

//возврат карточки клиента по ID
exports.getClientcard = function (request, response) {
    const id = request.params.idClients;
    const query1 = query('SELECT * FROM clients WHERE "idClients" = $1', [id]);
    const query2 = query('SELECT "idPasses", "DateStart", "DateEnd", "ClassesLeft" FROM passes WHERE "ID_Clients" = $1 ORDER BY "DateStart"', [id]);
    Promise.all([query1, query2]).then(function (data) {
        let client = data[0].rows[0];
        let passes = data[1].rows;
        passes = passes.map(item => {
            item.DateStart = new Date(item.DateStart);
            item.DateStart = `${item.DateStart.getDate()}.${item.DateStart.getMonth()+1}.${item.DateStart.getFullYear()}`
            item.DateEnd = new Date(item.DateEnd);
            item.DateEnd = `${item.DateEnd.getDate()}.${item.DateEnd.getMonth()+1}.${item.DateEnd.getFullYear()}`
            return item;
        });
        console.log(client, passes);
        let button1 = {
            action : "/clients/update",
            name : "Редактировать",
        };
        let button2 = {
            action : "/clients/delete",
            name : "Удалить",
        };
        response.render("clientcard", {
            button1,
            button2,
            title: "Карточка клиента",
            showpasses: true,
            client,
            passes,
        });
    });
};

//редактирование карточки клиента
exports.updateClient = function (request, response) {
    if(!request.body) return response.sendStatus(400);
    const id = request.body.id;
    const name = request.body.name;
    const surname = request.body.surname;
    const cellphone = request.body.cellphone;
    const vk = request.body.vk;
    const insta = request.body.insta;
    const info = request.body.info;
    const values = [
        name, surname, cellphone, vk, insta, info, id
    ];
    pool.query('UPDATE clients SET "Name" = $1, "Surname" = $2, "Cellphone" = $3, "VK" = $4, "Insta" = $5, "Info" = $6 WHERE "idClients" = $7', values, function (err, data){
        if (err) {
            console.log(err);
            response.redirect("back");
        }
        console.log(`Update client ${values} sucsessful`);
        response.redirect(`/clients/${id}`);
    });
};

//удаление клиента из БД
exports.deleteClient = function(request, response) {
    if(!request.body) return response.sendStatus(400);
    const id = request.body.id;
    pool.query('DELETE FROM clients WHERE idClients=?', [id], function(err, data) {
        if(err) return console.log(err);
        console.log(`Delete idClients ${id} succesful`);
        response.redirect("/clients");
    });
};