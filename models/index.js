import { sequelize } from '../boot/db.js';
import { config } from 'dotenv';
config()

import {Sequelize} from 'sequelize';

import { Clients } from './clients.js'
import { Passes } from './passes.js'

Passes.belongsTo(Clients, { foreignKey: 'clientId'});

//TODO: add relations to the model
//TODO: consider replacing some queries inside controllers that fetch related tables with related queries

//моделируем таблицу пользователей
export const User = sequelize.define('user', {
    idUser: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    userName: {
        type: Sequelize.STRING(45),
        defaultValue: null,
    },
    password: {
        type: Sequelize.STRING(45),
        defaultValue: null,
    }
}, {
    tableName: 'users',
    timestamps: false,
});

//passtypes table model
export const PassTypes = sequelize.define('passtype', {
    idPassTypes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    Type: {
        type: Sequelize.STRING(45),
        allowNull: false,
    },
    Amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Week: {
        type: Sequelize.INTEGER,
    },
    Month: {
      type: Sequelize.INTEGER,
    },
    Cost: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'passtypes',
    timestamps: false,
});

// income table model
export const income = sequelize.define('income', {
    idIncome: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    ID_IncomeTypes: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    Sum: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Info: {
        type: Sequelize.STRING(250),
        allowNull: true,
    }
}, {
    tableName: 'income',
    timestamps: false,
});

// income types table model
export const incometype = sequelize.define('incometype', {
    idIncomeTypes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    Type: {
        type: Sequelize.STRING(45),
        allowNull: false,
    },
    Info: {
        type: Sequelize.STRING(250),
        allowNull: true
    }
}, {
    tableName: 'incometypes',
    timestamps: false,
});

// expences table model
export const Expenses = sequelize.define('expense', {
    idExpenses: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    ID_ExpensesTypes: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    Cost: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Info: {
        type: Sequelize.STRING(250),
        allowNull: false,
    }
}, {
    tableName: 'expenses',
    timestamps: false,
});

// expenses types table model
export const ExpensesTypes = sequelize.define('expensesType', {
    idExpensesTypes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    Type: {
        type: Sequelize.STRING(45),
        allowNull: false,
    },
    Info: {
        type: Sequelize.STRING(250),
        allowNull: true
    }
}, {
    tableName: 'expensestypes',
    timestamps: false,
})

export {
    Clients,
    Passes,
}