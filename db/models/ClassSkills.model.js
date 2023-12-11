module.exports = (sequelize, DataTypes) => {
  class ClassSkill extends Model {
    static associate(models) {
      this.belongsTo(models.Classes, { foreignKey: 'class_id' });
      this.belongsTo(models.Skills, { foreignKey: 'skill_id' });
    }
  }
  ClassSkill.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
