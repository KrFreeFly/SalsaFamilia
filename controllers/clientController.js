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
}

//возврат формы списка клиентов
exports.getClients = function(request, response) {
    pool.query("SELECT * FROM clients ORDER BY Surname", function(err, data) {
        if(err) return console.log(err);
        response.render("clients", {
            clients: data,
            title : "Список клиентов",
        });
    });
};

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
    pool.query("INSERT INTO clients (Name, Surname, Cellphone, VK, Insta, Info) VALUES (?,?,?,?,?,?)", [name, surname, cellphone, vk, insta, info], function(err, data) {
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
    pool.query("SELECT * FROM clients WHERE Surname = (?)", [surname], function (err, data) {
        if (err) return console.log('filter' + err);
        response.render("clients.hbs", {
            clients: data,
            title: "Список клиентов",
        });
    });
};

//возврат карточки клиента по ID
exports.getClientcard = function (request, response) {
    const id = request.params.idClients;
    const query1 = query("SELECT * FROM clients WHERE idClients = (?)", [id]);
    const query2 = query("SELECT idPasses, DateStart, DateEnd, ClassesLeft FROM passes WHERE ID_Client=? ORDER BY DateStart", [id]);
    Promise.all([query1, query2]).then(function (result) {
        let client = JSON.parse(JSON.stringify(result[0][0]));
        let passes = Array.from(JSON.parse(JSON.stringify(result[1])));
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
    pool.query("UPDATE clients SET Name = (?), Surname = (?), Cellphone = (?), VK = (?), Insta = (?), Info = (?) WHERE idClients = (?)", values, function (err, data){
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
    pool.query("DELETE FROM clients WHERE idClients=?", [id], function(err, data) {
        if(err) return console.log(err);
        console.log(`Delete idClients ${id} succesful`);
        response.redirect("/clients");
    });
};

/*
//Код для "починки" таблицы клиентов после экспорта из OpenOfficeBase
//Разделяет поле с именем и фамилией на имяя и фамилию по отдельности
exports.fixTable = function(request, res) {
    pool.query("SELECT idClients, Name FROM clients", function(err, data) {
        if(err) return console.log(err);
        let dataArray = Object.values(JSON.parse(JSON.stringify(data)));
        console.log(dataArray[0]);
        dataArray.map(function(item) {
            item.Surname = item.Name.slice(0, item.Name.indexOf(' '));
            item.Name = item.Name.substr(item.Name.indexOf(' ')+1);
        });
        console.log(dataArray[0]);
        dataArray.forEach(function(item) {
            pool.query("UPDATE clients SET Name = (?), Surname = (?) where idClients = (?)", [item.Name, item.Surname, item.idClients], function (err, result) {
            console.log(result);
            })
        })
        res.redirect("/clients");
        });
    });
};
*/

/*

//Код для починки адресов страниц VK в клиентах - удаляем пробелы в конце ссылки


 */