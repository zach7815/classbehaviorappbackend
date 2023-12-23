const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    static associate(models) {
      this.hasMany(models.classes, { foreignKey: 'subject_id' });
      this.hasMany(models.subjectSkills, { foreignKey: 'subject_id' });
    }
  }
  Subject.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      subject_name: { type: DataTypes.STRING(255) },
    },
    {
      sequelize,
      modelName: 'subjects', // ! model name MUST match table name
      underscored: true,
    }
  );
  return Subject;
};
