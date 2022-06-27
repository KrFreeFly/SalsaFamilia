import sequelize from '../boot/db.js';
import DataTypes from 'sequelize';
import { Clients } from './clients.js';
import { PassTypes } from './passTypes.js';

export const Passes = sequelize.define(
  'pass',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    clientId: {
      field: 'client_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Clients,
        key: 'id',
      },
    },
    passTypeId: {
      field: 'pass_type_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: PassTypes,
        key: 'id',
      },
    },
    startDate: {
      field: 'start_date',
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      field: 'end_date',
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    classesLeft: {
      field: 'classes_left',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    wasFrozen: {
      field: 'was_frozen',
      type: DataTypes.INTEGER,
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
      defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      allowNull: false,
      field: 'updated_at',
      type: 'TIMESTAMP',
      defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    tableName: 'passes',
    timestamps: true,
  },
);
