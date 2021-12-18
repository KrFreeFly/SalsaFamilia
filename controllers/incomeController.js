// loading database model
const model = require('../boot/db.js')

// loading service functions
const {transformData, transformDate} = require("../public/javascripts/functions.js");

//Getting all income
exports.getIncome = async function (req, res) {
    try {
        let income = await model.income.findAll()
        let incometypes = await model.incometype.findAll({
            attributes: ['idIncomeTypes', 'Type']
        })
        income = income.map(item => {
            let idType = item.ID_IncomeTypes;
            item.Type = incometypes.find(item => item.idIncomeTypes === idType).Type;
            item.Date = transformDate(item.Date);
            return item
        });
        res.render('income', {
            title: 'Доходы',
            income,
            incometypes
        })
    } catch (err) {
        console.log(err)
        res.redirect('back')
    }
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
