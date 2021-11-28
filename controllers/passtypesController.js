// loading database model
const model = require('../boot/db.js')

// loading service functions
const {transformData} = require("../public/javascripts/functions.js");

//getting all passtypes
exports.getPasstypes = async function (req, res) {
    try {
        let passtypes = await model.passtype.findAll()
        passtypes = transformData(passtypes)
        console.log(`Found ${passtypes.length} passtypes`)
        res.render('passtypes', {
            passtypes,
            title: 'Типы абонементов',
        });
    } catch (err) {
        console.log(err)
        res.redirect('back')
    }
};
///////////////////////////////////////
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