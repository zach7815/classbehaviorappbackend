const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    static associate(models) {
      this.belongsToMany(models.classes, {
        through: models.classSkills,
        as: 'skillClassesAssociation',
      });
      this.hasMany(models.subjectSkills);
      this.belongsTo(models.feedback);
    }
  }
  Skill.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      skill_name: { type: DataTypes.STRING(255) },
    },
    {
      sequelize,
      modelName: 'skills', // ! model name MUST match table name
      underscored: true,
    }
  );
  return Skill;
};
