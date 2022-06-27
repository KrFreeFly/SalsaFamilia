'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pass_types', {
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
      amount: {
        type: Sequelize.INTEGER,
      },
      unlimited: {
        type: Sequelize.BOOLEAN,
      },
      week: {
        type: Sequelize.INTEGER,
      },
      month: {
        type: Sequelize.INTEGER,
      },
      cost: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('pass_types');
  },
};
