import sequelize from '../boot/db.js';
import DataTypes from 'sequelize';

export const Clients = sequelize.define(
  'Clients',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(45),
      defaultValue: null,
    },
    surname: {
      type: DataTypes.STRING(45),
      defaultValue: null,
    },
    cellphone: {
      type: DataTypes.STRING(20),
      defaultValue: '(999)1234567',
    },
    vk: {
      type: DataTypes.STRING(45),
      defaultValue: null,
    },
    insta: {
      type: DataTypes.STRING(45),
      defaultValue: null,
    },
    info: {
      type: DataTypes.STRING(250),
      defaultValue: null,
    },
    statusId: {
      field: 'status_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    red: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    birthday: {
      type: DataTypes.DATEONLY,
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
    tableName: 'clients',
    timestamps: true,
  },
);
