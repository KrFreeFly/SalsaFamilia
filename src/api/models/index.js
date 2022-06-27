import { Clients } from './clients.js';
import { PassTypes } from './passTypes.js';
import { Passes } from './passes.js';
import { Classes } from './classes.js';
import { Teachers } from './teachers.js';
import { ClassesClients } from './classesClients.js';
import { ClassesTeachers } from './classesTeachers.js';
import { ExpensesTypes } from './expensesTypes.js';

Passes.belongsTo(Clients, { foreignKey: 'client_id' });
Clients.hasMany(Passes, { foreignKey: 'client_id' });

PassTypes.hasMany(Passes, { foreignKey: 'pass_type_id' });
Passes.belongsTo(PassTypes, { foreignKey: 'pass_type_id' });

Clients.belongsToMany(Classes, { as: 'classes', through: ClassesClients, foreignKey: 'clientId' });
Classes.belongsToMany(Clients, { as: 'clients', through: ClassesClients, foreignKey: 'classId' });

Teachers.belongsToMany(Classes, {
  as: 'classes',
  through: ClassesTeachers,
  foreignKey: 'teacherId',
});
Classes.belongsToMany(Teachers, {
  as: 'teachers',
  through: ClassesTeachers,
  foreignKey: 'classId',
});

Clients.hasMany(ClassesClients, { foreignKey: 'clientId' });
ClassesClients.belongsTo(Clients);

Teachers.hasMany(ClassesTeachers, { foreignKey: 'teacherId' });
ClassesTeachers.belongsTo(Teachers);

//TODO: add relations to the model
//TODO: consider replacing some queries inside controllers that fetch related tables with related queries

// //моделируем таблицу пользователей
// export const User = sequelize.define('user', {
//     idUser: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         autoIncrement: true,
//         unique: true,
//         primaryKey: true,
//     },
//     userName: {
//         type: Sequelize.STRING(45),
//         defaultValue: null,
//     },
//     password: {
//         type: Sequelize.STRING(45),
//         defaultValue: null,
//     }
// }, {
//     tableName: 'users',
//     timestamps: false,
// });
//

//
// // income table model
// export const income = sequelize.define('income', {
//     idIncome: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         autoIncrement: true,
//         unique: true,
//         primaryKey: true,
//     },
//     ID_IncomeTypes: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//     },
//     Date: {
//         type: Sequelize.DATEONLY,
//         allowNull: false,
//     },
//     Sum: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//     },
//     Info: {
//         type: Sequelize.STRING(250),
//         allowNull: true,
//     }
// }, {
//     tableName: 'income',
//     timestamps: false,
// });
//
// // income types table model
// export const incometype = sequelize.define('incometype', {
//     idIncomeTypes: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         autoIncrement: true,
//         unique: true,
//         primaryKey: true,
//     },
//     Type: {
//         type: Sequelize.STRING(45),
//         allowNull: false,
//     },
//     Info: {
//         type: Sequelize.STRING(250),
//         allowNull: true
//     }
// }, {
//     tableName: 'incometypes',
//     timestamps: false,
// });
//
// // expences table model
// export const Expenses = sequelize.define('expense', {
//     idExpenses: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         autoIncrement: true,
//         unique: true,
//         primaryKey: true,
//     },
//     ID_ExpensesTypes: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//     },
//     Date: {
//         type: Sequelize.DATEONLY,
//         allowNull: false,
//     },
//     Cost: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//     },
//     Info: {
//         type: Sequelize.STRING(250),
//         allowNull: false,
//     }
// }, {
//     tableName: 'expenses',
//     timestamps: false,
// });
//
// // expenses types table model

export {
  Clients,
  Passes,
  Classes,
  ClassesTeachers,
  ClassesClients,
  Teachers,
  ExpensesTypes,
  PassTypes,
};
