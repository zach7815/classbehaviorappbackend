const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    static associate(models) {
      this.hasMany(models.classes, { foreignKey: 'class_id' });
      this.belongsToMany(models.subjectSkills, { through: 'subjects' });
    }
  }
  Subject.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      subjectName: { type: DataTypes.STRING(255) },
    },
    {
      sequelize,
      modelName: 'subjects', // ! model name MUST match table name
      underscored: true,
    }
  );
  return Subject;
};
