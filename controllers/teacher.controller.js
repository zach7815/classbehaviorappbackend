class TeacherController {
  constructor(db) {
    this.db = db;
  }
  createClass = async (req, res) => {
    try {
      const { class_name, subject_id, grade } = req.body;

      const classToAdd = {
        class_name: class_name,
        subject_id: subject_id,
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
