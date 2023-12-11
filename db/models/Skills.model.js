module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    static associate(models) {
      this.hasMany(models.ClassSkills, { foreignKey: 'skill_id' });
      this.hasMany(models.SubjectSkills, { foreignKey: 'skill_id' });
      this.belongsTo(models.Feedback, { foreignKey: 'feedback_id' });
    }
  }
  Skill.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      skillName: { type: DataTypes.STRING(255) },
    },
    {
      sequelize,
      modelName: 'skills', // ! model name MUST match table name
      underscored: true,
    }
  );
  return Skill;
};
