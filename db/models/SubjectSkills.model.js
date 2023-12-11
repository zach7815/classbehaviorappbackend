module.exports = (sequelize, DataTypes) => {
  class SubjectSkills extends Model {
    static associate(models) {
      this.belongsTo(models.Subjects, { foreignKey: 'class_id' });
      this.belongsTo(models.Skills, { foreignKey: 'skill_id' });
    }
  }
  SubjectSkills.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      sequelize,
      modelName: 'subjectSkills', // ! model name MUST match table name
      underscored: true,
    }
  );
  return SubjectSkills;
};
