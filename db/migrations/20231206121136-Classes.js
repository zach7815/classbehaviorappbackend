'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('classes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      class_name: {
        type: Sequelize.STRING,
      },

      subject_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'subjects',
          key: 'id',
        },
      },
      grade: {
        type: Sequelize.INTEGER,
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('classes');
  },
};
