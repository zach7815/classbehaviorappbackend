const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    static associate(models) {
      this.belongsTo(models.teacherStudentClasses, {
        foreignKey: 'teacherStudentClasses_id',
      });
      this.belongsTo(models.skills, { foreignKey: 'skill_id' });
    }
  }
  Feedback.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      feedbackDate: { type: DataTypes.DATE },
      skillsValue: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      modelName: 'feedback', // ! model name MUST match table name
      underscored: true,
    }
  );
  return Feedback;
};
