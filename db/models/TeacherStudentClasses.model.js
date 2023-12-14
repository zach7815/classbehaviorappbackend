const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TeacherStudentClass extends Model {
    static associate(models) {
      this.belongsTo(models.teachers, { foreignKey: 'teacher_id' });
      this.belongsTo(models.classes, { foreignKey: 'class_id' });
      this.belongsTo(models.teachingRoles, { foreignKey: 'role_id' });
      this.belongsTo(models.students, { foreignKey: 'student_id' });
    }
  }
  TeacherStudentClass.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      teachers_id: {
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

      roles_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'teachingRoles',
          key: 'id',
        },
      },

      students_id: {
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
