const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SubjectSkills extends Model {
    static associate(models) {
      this.belongsTo(models.subjects);
      this.belongsTo(models.skills);
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
      skills_id: {
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
