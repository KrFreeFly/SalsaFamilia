import sequelize from "../boot/db.js";
import { Sequelize } from "sequelize";

export const ExpensesTypes = sequelize.define('expensesType', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    type: {
        type: Sequelize.STRING(45),
        allowNull: false,
    },
    info: {
        type: Sequelize.STRING(250),
        allowNull: true
    }
}, {
    tableName: 'expenses_types',
    timestamps: false,
});