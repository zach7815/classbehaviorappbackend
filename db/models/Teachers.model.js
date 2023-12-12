const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    static associate(models) {
      this.hasMany(models.teacherStudentClasses, { foreignKey: 'teacher_id' });
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
      email: {
        type: DataTypes.STRING(255),
        // * added validation
        validate: {
          isEmail: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'teachers', // ! model name MUST match table name
      underscored: true,
    }
  );
  return Teacher;
};
