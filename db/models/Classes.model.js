const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    static associate(models) {
      this.belongsToMany(models.skills, { through: 'classSkills' });
      this.hasMany(models.subjects, { foreignKey: 'subject_id' });
      this.belongsTo(models.teacherStudentClasses, { foreignKey: 'class_id' });
    }
  }
  Class.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      className: { type: DataTypes.STRING(255) },
      grade: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      modelName: 'classes', // ! model name MUST match table name
      underscored: true,
    }
  );
  return Class;
};
