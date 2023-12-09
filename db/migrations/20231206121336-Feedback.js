'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('feedback', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      teacherStudentClasses_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'TeacherStudentClasses',
          key: 'id',
        },
      },

      skills_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'skills',
          key: 'id',
        },
      },

      skillsValue: {
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
    await queryInterface.dropTable('feedback');
  },
};
