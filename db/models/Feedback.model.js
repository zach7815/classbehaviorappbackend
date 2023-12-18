const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    static associate(models) {
      this.belongsTo(models.teacherStudentClasses);
      this.belongsTo(models.skills);
    }
  }
  Feedback.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      teacher_student_classes_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'teacherStudentClasses',
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

      feedback_date: { type: DataTypes.DATE },
      skills_value: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      modelName: 'feedback', // ! model name MUST match table name
      underscored: true,
    }
  );
  return Feedback;
};
