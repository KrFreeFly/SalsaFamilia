const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config()
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URI

const sequelize = new Sequelize(connectionString, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

//TODO: add relations to the model
//TODO: consider replacing some queries inside controllers that fetch related tables with related queries

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

//моделируем таблицу абонементов
const pass = sequelize.define('pass', {
    idPasses: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    ID_Clients: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ID_PassTypes: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    DateStart: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    DateEnd: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    ClassesLeft: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    WasFrozen: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
}, {
    tableName: 'passes',
    timestamps: false,
});

//моделируем таблицу пользователей
const user = sequelize.define('user', {
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    userName: {
        type: DataTypes.STRING(45),
        defaultValue: null,
    },
    password: {
        type: DataTypes.STRING(45),
        defaultValue: null,
    }
}, {
    tableName: 'users',
    timestamps: false,
});

//passtypes table model
const passtype = sequelize.define('passtype', {
    idPassTypes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    Type: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    Amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Week: {
        type: DataTypes.INTEGER,
    },
    Month: {
      type: DataTypes.INTEGER,
    },
    Cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'passtypes',
    timestamps: false,
});

// income table model
const income = sequelize.define('income', {
    idIncome: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    ID_IncomeTypes: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    Sum: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Info: {
        type: DataTypes.STRING(250),
        allowNull: true,
    }
}, {
    tableName: 'income',
    timestamps: false,
});

// income types table model
const incometype = sequelize.define('incometype', {
    idIncomeTypes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    Type: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    Info: {
        type: DataTypes.STRING(250),
        allowNull: true
    }
}, {
    tableName: 'incometypes',
    timestamps: false,
});

// expences table model
const expense = sequelize.define('expense', {
    idExpenses: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    ID_ExpensesTypes: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    Cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Info: {
        type: DataTypes.STRING(250),
        allowNull: false,
    }
}, {
    tableName: 'expenses',
    timestamps: false,
});

// expenses types table model
const expensesType = sequelize.define('expensesType', {
    idExpensesTypes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    Type: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    Info: {
        type: DataTypes.STRING(250),
        allowNull: true
    }
}, {
    tableName: 'expensestypes',
    timestamps: false,
})

module.exports = {
    client,
    pass,
    user,
    passtype,
    income,
    incometype,
    expense,
    expensesType,
}