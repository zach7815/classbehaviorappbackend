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

  removeStudentsFromClass = async (req, res) => {
    const { ids } = req.body;

    try {
      await this.db.teacherStudentClasses.destroy({
        where: { id: ids },
      });
      res.status(200).json('received');
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: true, msg: error });
    }
  };

  addStudentsToClass = async (req, res) => {
    const { student_ids, class_id } = req.body;

    try {
      const currentClass = await this.db.classes.findByPk(class_id);
      const studentsExist = await Promise.all(
        student_ids.map(async (student) => {
          const result = await this.db.students.findByPk(student);
          return !!result; // Convert result to boolean
        })
      );
      const allStudentsExist = studentsExist.every(
        (studentExists) => studentExists
      );

      if (currentClass && allStudentsExist) {
        const currentTeachersAndRoles =
          await this.db.teacherStudentClasses.findAll({
            attributes: ['teacher_id', 'role_id'],
            group: ['teacher_id', 'role_id'],
            where: { class_id: class_id },
          });

        const teacherAndRoleIds = currentTeachersAndRoles.map(
          (teacherObject) => {
            return {
              teacher_id: teacherObject['dataValues']['teacher_id'],
              role_id: teacherObject['dataValues']['role_id'],
            };
          }
        );

        const newStudentEntries = teacherAndRoleIds.flatMap(
          ({ teacher_id, role_id }) =>
            student_ids.map((student_id) => ({
              class_id,
              teacher_id,
              role_id,
              student_id,
            }))
        );

        await this.db.teacherStudentClasses.bulkCreate(newStudentEntries, {
          fields: [
            'class_id',
            'teacher_id',
            'role_id',
            'student_id',
            'created_at',
            'updated_at',
          ],
        });

        return res.status(200).json('students added successfully');
      } else {
        return res.send(' The class and/or student do not exist');
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getAllStudents = async (req, res) => {
    const AllStudents = await this.db.teacherStudentClasses.findAll({
      attributes: ['student_id'],
      group: 'student_id',

      where: { class_id: class_id },
    });
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
