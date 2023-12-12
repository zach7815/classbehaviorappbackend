const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClassSkill extends Model {
    static associate(models) {
      this.belongsTo(models.classes);
      this.belongsTo(models.skills);
    }
  }
  ClassSkill.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      skill_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'skills',
          key: 'id',
        },
      },
      class_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'classes',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'classSkills', // ! model name MUST match table name
      underscored: true,
    }
  );
  return ClassSkill;
};
