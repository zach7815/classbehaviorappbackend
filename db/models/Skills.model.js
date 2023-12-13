const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    static associate(models) {
      this.belongsToMany(models.classes, { through: 'classSkills' });
      this.hasMany(models.subjectSkills, { foreignKey: 'skill_id' });
      this.belongsTo(models.feedback, { foreignKey: 'feedback_id' });
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
