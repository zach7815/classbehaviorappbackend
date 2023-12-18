class TeacherController {
  constructor(db) {
    this.db = db;
  }

  giveStudentsFeedback = async (req, res) => {
    // the
  };

  addStudent = async (req, res) => {
    try {
      const { first_name, last_name } = req.body;
      const studentToAdd = {
        first_name: first_name,
        last_name: last_name,
      };

      const newStudent = await this.db.students.create(studentToAdd);
      res.status(200).json(newStudent);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

  async addCategoryToSighting2(req, res) {
    const { sighting_id, categories } = req.body;
    try {
      console.log(sighting_id, categories);
      const newSightingCategory = await this.db.sightingCategories.create({
        sightingId: sighting_id, //these are snake case in the table, but because of underscored: true, they have to be camel case here
        categoryId: categories,
      });
      return res.json(newSightingCategory);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  addStudentToClass = async (req, res) => {
    const { student_id, class_id } = req.body;

    try {
      const currentTeachers = await this.db.teacherStudentClasses.findAll({
        attributes: ['teacher_id'],
        group: 'teacher_id',
        where: { class_id: class_id },
      });

      const teacherIds = currentTeachers.map((teacherObject) => {
        return teacherObject['dataValues']['teacher_id'];
      });

      console.log(currentTeachers);

      const AllStudents = await this.db.teacherStudentClasses.findAll({
        attributes: ['student_id'],
        group: 'student_id',
        where: { class_id: class_id },
      });
      const studentIds = AllStudents.map((studentObject) => {
        return studentObject['dataValues']['student_id'];
      });

      const classPersonal = teacherIds.flatMap((teacher_id) => {
        return studentIds.map((student_id) => {
          return {
            class_id: class_id,
            teacher_id: teacher_id,
            student_id: student_id,
          };
        });
      });

      console.log(console.log(classPersonal));

      // console.log('The current teachers are ' + currentTeachers);

      //* bulk create array of objects of students - each obj - teacher_id, class_id, student_id.
      //* map over currentTeachers create array of objects

      const currentClass = await this.db.classes.findByPk(class_id);
      // console.log(currentClass);
      const studentsToAdd = await this.db.students.findByPk(student_id);
      // console.log(studentsToAdd);
      // currentClass.addStudent(student);
      return res.json(currentTeachers);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  };

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
