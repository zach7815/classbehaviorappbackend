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
    },
    {
      sequelize,
      modelName: 'teacherStudentClasses', // ! model name MUST match table name
      underscored: true,
    }
  );
  return TeacherStudentClass;
};
