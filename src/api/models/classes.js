import sequelize from '../boot/db.js';
import { Sequelize } from 'sequelize';

export const Classes = sequelize.define('Classes', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    dateStart: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    dateEnd: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    idTeachers: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false,
    },
    idPasses: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
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