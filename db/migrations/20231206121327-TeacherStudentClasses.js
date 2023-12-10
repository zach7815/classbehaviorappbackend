'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('teacherStudentClasses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      teacher_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'teachers',
          key: 'id',
        },
      },

      class_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'classes',
          key: 'id',
        },
      },
      role_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'teachingRoles',
          key: 'id',
        },
      },
      student_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'students',
          key: 'id',
        },
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
    await queryInterface.dropTable('teacherStudentClasses');
  },
};
