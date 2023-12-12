class TeacherController {
  constructor(db) {
    this.db = db;
  }
  createClass = async (req, res) => {
    try {
      const { className, subjectId, grade } = req.body;

      const classToAdd = {
        class_name: className,
        subject_id: subjectId,
        grade: grade,
      };
      const newClass = await this.db.classes.create(classToAdd);
      res.status(200).json(newClass);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };
}
module.exports = TeacherController;
