import sequelize from '../boot/db.js';
import DataTypes from 'sequelize';

export const PassTypes = sequelize.define(
  'PassTypes',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
    },
    unlimited: {
      type: DataTypes.BOOLEAN,
    },
    week: {
      type: DataTypes.INTEGER,
    },
    month: {
      type: DataTypes.INTEGER,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'pass_types',
    timestamps: false,
  },
);
