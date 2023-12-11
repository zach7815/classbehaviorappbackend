class TeacherController {
  constructor(db) {
    this.db = db;
  }
  createClass = async (req, res) => {
    try {
      [className, subjectId, grade] = req.body;

      const classToAdd = {
        className: className,
        subject_id: subjectId,
        grade: grade,
      };
      const newClass = await this.db.classes(classToAdd);
      res.status(200).json(newClass);
    } catch (error) {
      res.status(500).json(err);
    }
  };
}
