const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      this.hasMany(models.TeacherStudentClasses, { foreignKey: 'student_id' });
      models.TeacherStudentClasses.belongsTo(this, {
        foreignKey: 'student_id',
      });
    }
  }
  Teacher.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: { type: DataTypes.STRING(255) },
      last_name: { type: DataTypes.STRING(255) },
    },
    {
      sequelize,
      modelName: 'students', // ! model name MUST match table name
      underscored: true,
    }
  );
  return Student;
};
