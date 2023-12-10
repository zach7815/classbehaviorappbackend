const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TeachingRole extends Model {
    static associate(models) {
      this.hasMany(models.TeacherStudentClasses, { foreignKey: 'role_id' });
      this.belongsToMany(models.classes, {
        through: models.TeachingRole,
        key: 'role_id',
      });
    }
  }
  Student.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      roleName: { type: DataTypes.STRING(255) },
    },
    {
      sequelize,
      modelName: 'teachingRoles', // ! model name MUST match table name
      underscored: true,
    }
  );
  return TeachingRole;
};
