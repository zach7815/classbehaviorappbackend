const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TeacherStudentClass extends Model {
    static associate(models) {
      this.belongsTo(models.teachers);
      this.belongsTo(models.classes);
      this.belongsTo(models.teachingRoles);
      this.belongsTo(models.students);
    }
  }
  TeacherStudentClass.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      teacher_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'teachers',
          key: 'id',
        },
      },

      class_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'classes',
          key: 'id',
        },
      },

      role_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'teachingRoles',
          key: 'id',
        },
      },

      student_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'students',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'teacherStudentClasses', // ! model name MUST match table name
      underscored: true,
    }
  );
  return TeacherStudentClass;
};
