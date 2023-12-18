const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TeachingRole extends Model {
    static associate(models) {
      this.hasMany(models.teacherStudentClasses);
    }
  }
  TeachingRole.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      role_name: { type: DataTypes.STRING(255) },
    },
    {
      sequelize,
      modelName: 'teachingRoles', // ! model name MUST match table name
      underscored: true,
    }
  );
  return TeachingRole;
};
