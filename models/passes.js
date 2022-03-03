import { sequelize } from '../boot/db.js';
import {Sequelize} from 'sequelize';

export const Passes = sequelize.define('pass', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    clientId: {
        field: 'client_id',
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    passTypeId: {
        field: 'pass_type_id',
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    startDate: {
        field: 'start_date',
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    endDate: {
        field: 'end_date',
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    classesLeft: {
        field: 'classes_left',
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    cost: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    wasFrozen: {
        field: 'was_frozen',
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
    tableName: 'passes',
    timestamps: true,
});