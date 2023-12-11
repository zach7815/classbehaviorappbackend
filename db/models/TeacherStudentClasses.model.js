module.exports = (sequelize, DataTypes) => {
  class TeacherStudentClass extends Model {
    static associate(models) {
      this.belongsTo(models.Teachers, { foreignKey: 'teacher_id' });
      this.belongsTo(models.Classes, { foreignKey: 'class_id' });
      this.belongsTo(models.TeachingRoles, { foreignKey: 'role_id' });
      this.belongsTo(models.Students, { foreignKey: 'student_id' });
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
      modelName: 'TeacherStudentClasses', // ! model name MUST match table name
      underscored: true,
    }
  );
  return TeacherStudentClass;
};
