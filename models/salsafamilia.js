const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('salsafamilia', 'root', '4815162342', {
    host: 'localhost',
    dialect: 'mysql',
});

//моделируем таблицу клиентов
const clients = sequelize.define('clients', {
    idClients: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    Name: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    Surname: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    Cellphone: {
        type: DataTypes.DECIMAL(10,0),
        defaultValue: 9991234567,
    },
    VK: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    Insta: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    Info: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    ID_Status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    Red: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
    }
}, {
    tableName: "clients"
});

async function f() {
    const client = await clients.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt']}
    });
    console.log (client);
}

f();

exports.clients = clients;