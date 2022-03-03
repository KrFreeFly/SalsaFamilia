import { sequelize } from '../boot/db.js';
import { Sequelize } from 'sequelize';


export const Clients = sequelize.define('Clients', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(45),
    defaultValue: null,
  },
  surname: {
    type: Sequelize.STRING(45),
    defaultValue: null,
  },
  cellphone: {
    type: Sequelize.STRING(20),
    defaultValue: '(999)1234567',
  },
  vk: {
    type: Sequelize.STRING(45),
    defaultValue: null,
  },
  insta: {
    type: Sequelize.STRING(45),
    defaultValue: null,
  },
  info: {
    type: Sequelize.STRING(250),
    defaultValue: null,
  },
  statusId: {
    field: 'status_id',
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  red: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  birthday: {
    type: Sequelize.DATEONLY,
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
  tableName: 'clients',
  timestamps: true,
});