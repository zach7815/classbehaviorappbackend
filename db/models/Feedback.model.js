const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    static associate(models) {
      this.belongsTo(models.teacherStudentClasses, {
        foreignKey: 'teacher_student_classes_id',
      });
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

      feedback_comment: { type: DataTypes.STRING(255) },

      feedback_date: { type: DataTypes.DATE },
      skills_value: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      modelName: 'feedback', // ! model name MUST match table name
      tableName: 'feedback', // Add this line
      underscored: true,
    }
  );
  return Feedback;
};
