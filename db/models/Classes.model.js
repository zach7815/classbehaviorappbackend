module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    static associate(models) {
      this.hasMany(models.ClassSkills, { foreignKey: 'class_id' });
      this.hasMany(models.Subjects, { foreignKey: 'subject_id' });
      this.belongsTo(models.TeacherStudentClasses, { foreignKey: 'class_id' });
    }
  }
  Class.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      className: { type: DataTypes.STRING(255) },
      grade: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      modelName: 'skills', // ! model name MUST match table name
      underscored: true,
    }
  );
  return Class;
};
