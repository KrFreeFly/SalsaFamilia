const sequelize = require('../boot/db');
const { Sequelize, DataTypes } = require('sequelize');

const Classes = sequelize.define('Classes', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    dateStart: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    dateEnd: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    idTeachers: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
    },
    idPasses: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    removedAt: {
        field: 'removed_at',
        type: 'TIMESTAMP',
    },
    createdAt: {
        allowNull: false,
        field: 'created_at',
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
}, {
    tableName: 'classes',
    timestamps: true,
});

module.exports = Classes