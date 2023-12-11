module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    static associate(models) {
      this.hasMany(models.Classes, { foreignKey: 'skill_id' });
      this.hasMany(models.SubjectSkills, { foreignKey: 'skill_id' });
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
      modelName: 'skills', // ! model name MUST match table name
      underscored: true,
    }
  );
  return Subject;
};
