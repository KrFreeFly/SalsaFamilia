const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    username: 'nrixcjoqurpngb',
    password: '9cbf6cc54df797570cc01fd3f6c178fbb9d4c9789888aa6267d0bcd41ee0b41f',
    host: 'ec2-52-30-81-192.eu-west-1.compute.amazonaws.com',
    port: 5432,
    database: 'd8blcg87f3fr65',
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
});

//моделируем таблицу клиентов
const client = sequelize.define('client', {
    idClients: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    Name: {
        type: DataTypes.STRING(45),
        defaultValue: null,
    },
    Surname: {
        type: DataTypes.STRING(45),
        defaultValue: null,
    },
    Cellphone: {
        type: DataTypes.STRING(20),
        defaultValue: '(999)1234567',
    },
    VK: {
        type: DataTypes.STRING(45),
        defaultValue: null,
    },
    Insta: {
        type: DataTypes.STRING(45),
        defaultValue: null,
    },
    Info: {
        type: DataTypes.STRING(250),
        defaultValue: null,
    },
    ID_Status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    Red: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    Birthday: {
        type: DataTypes.DATEONLY,
    }
}, {
    tableName: 'clients',
    timestamps: false,
});

module.exports.client = client;
