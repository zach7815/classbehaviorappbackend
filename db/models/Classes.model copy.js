const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    static associate(models) {
      this.hasMany(models.classSkills, { as: 'classSkillsAssociation' });
      // this.hasMany(models.subjects);
      this.belongsToMany(models.teachers, { through: 'teacherStudentClasses' });
    }
  }
  Class.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      class_name: { type: DataTypes.STRING(255) },

      subject_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'subjects',
          key: 'id',
        },
      },

      grade: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      modelName: 'classes', // ! model name MUST match table name
      underscored: true,
    }
  );
  return Class;
};
