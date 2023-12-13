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
      teacher_student_classes_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'teacherStudentClasses',
          key: 'id',
        },
      },

      skill_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'skills',
          key: 'id',
        },
      },

      feedback_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      skills_value: {
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
