const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SubjectSkills extends Model {
    static associate(models) {
      this.belongsTo(models.subjects, { foreignKey: 'subject_id' });
      this.belongsTo(models.skills, { foreignKey: 'skill_id' });
    }
  }
  SubjectSkills.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      subject_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'subjects',
          key: 'id',
        },
      },
      skill_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'skills',
          key: 'id',
        },
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
