class TeacherController {
  constructor(db) {
    this.db = db;
  }

  giveStudentsFeedback = async (req, res) => {};

  getClassFeedback = async (req, res) => {
    const { class_id } = req.body;
    const classFeedbackData = {};

    try {
      const classMeta = await this.db.classes.findOne({
        where: { id: class_id },
      });

      //* gets class_info data and subject name for classData
      const extractedClass = {
        id: classMeta.dataValues.id,
        class_name: classMeta.dataValues.class_name,
        subject_id: classMeta.dataValues.subject_id,
        subject: '',
        grade: classMeta.dataValues.grade,
        createdAt: classMeta.dataValues.createdAt,
        updatedAt: classMeta.dataValues.updatedAt,
      };
      const subjectName = await this.db.subjects.findOne({
        where: { id: extractedClass['subject_id'] },
      });
      extractedClass.subject = subjectName.dataValues.subject_name;
      classFeedbackData.class_info = extractedClass;

      //* get all class_teacher info

      const classTeacherMeta = await this.db.teacherStudentClasses.findAll({
        attributes: ['role_id', 'teacher_id'],
        group: ['role_id', 'teacher_id'],
        where: { class_id: class_id },
      });

      const classTeachersIds = classTeacherMeta.map((meta) => {
        return meta.dataValues['teacher_id'];
      });
      const teachingRoleIds = classTeacherMeta.map((meta) => {
        return meta.dataValues['role_id'];
      });

      const teacherInfo = await this.db.teachers.findAll({
        where: {
          id: classTeachersIds,
        },
      });
      const RoleInfo = await this.db.teachingRoles.findAll({
        where: {
          id: teachingRoleIds,
        },
      });

      //* creates Array of class teacher info
      const Teachers = teacherInfo.map((teacher, index) => {
        return {
          first_name: teacher.dataValues.first_name,
          last_name: teacher.dataValues.last_name,
          email_address: teacher.dataValues.email_address,
          id: teacher.dataValues.id,
          role_id: classTeacherMeta[index]['dataValues']['role_id'],
          role_name: RoleInfo[index][`dataValues`][`role_name`],
        };
      });

      classFeedbackData.Teachers = Teachers;

      //* get all students

      // const classStudentsInfo = await this.db.teacherStudentClasses.findAll({
      //   attributes: ['student_id'],
      //   group: ['student_id'],
      //   where: { class_id: class_id },
      // });

      // const extractedStudentIds = classStudentsInfo.map((student) => {
      //   return student.dataValues.student_id;
      // });

      // const classStudents = await this.db.students.findAll({
      //   where: {
      //     id: extractedStudentIds,
      //   },
      // });

      // const classFeedback = await this.db.feedback.findAll({
      //   where: { teacher_student_classes_id: class_id },
      // });

      // const students = JSON.parse(JSON.stringify(classStudents));

      // const extractedFeedback = classFeedback.map((feedback) => {
      //   return {
      //     id: feedback.dataValues.id,
      //     teacher_student_classes_id:
      //       feedback.dataValues.teacher_student_classes_id,
      //     skill_id: feedback.dataValues.skill_id,
      //     feedback_date: feedback.dataValues.feedback_date,
      //     skills_value: feedback.dataValues.skills_value,
      //     createdAt: feedback.dataValues.createdAt,
      //     updatedAt: feedback.dataValues.updatedAt,
      //     skillId: feedback.dataValues.skillId,
      //   };
      // });

      // console.log(extractedFeedback);

      const feedback = await this.db.feedback.findAll({
        where: { teacher_student_classes_id: 1 },
        include: [
          {
            model: this.db.teacherStudentClasses,
            include: [
              {
                model: this.db.students,
                attributes: [
                  'id',
                  'first_name',
                  'last_name',
                  'createdAt',
                  'updatedAt',
                ],
              },
            ],
          },
        ],

        attributes: ['teacher_student_classes_id', 'skill_id', 'feedback_date'],
      });

      console.log(feedback);

      // const totalClassFeedbackScore = extractedFeedback.reduce((ac, cv) => {
      //   const skillsValue = cv.skills_value;
      //   return ac + skillsValue;
      // }, 0);

      res.status(200).json(feedback);
    } catch (error) {
      res.status(400).json(`Error:${error}`);
    }
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

  // * classroom management Methods

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
  //* GetAll Methods from each table

  getAllStudents = async (req, res) => {
    try {
      const AllStudents = await this.db.students.findAll();
      res.json(AllStudents);
    } catch (error) {
      res.status(400).json(`Error: ${error}`);
    }
  };

  getAllTeachers = async (req, res) => {
    try {
      const AllTeachers = await this.db.teachers.findAll();
      res.json(AllTeachers);
    } catch (error) {
      res.status(400).json(`Error: ${error}`);
    }
  };

  getAllSkills = async (req, res) => {
    try {
      const AllSkills = await this.db.skills.findAll();
      res.json(AllSkills);
    } catch (error) {
      res.status(400).json(`Error: ${error}`);
    }
  };

  getAllSubjects = async (req, res) => {
    try {
      const AllSubjects = await this.db.subjects.findAll();
      res.json(AllSubjects);
    } catch (error) {
      res.status(400).json(`Error: ${error}`);
    }
  };

  getAllClasses = async (req, res) => {
    try {
      const AllClasses = await this.db.classes.findAll();
      res.json(AllClasses);
    } catch (error) {
      res.status(400).json(`Error: ${error}`);
    }
  };

  getAllTeachingRoles = async (req, res) => {
    try {
      const AllTeachingRoles = await this.db.teachingRoles.findAll();
      res.json(AllTeachingRoles);
    } catch (error) {
      res.status(400).json(`Error: ${error}`);
    }
  };

  getAllSubjectSkills = async (req, res) => {
    try {
      const AllSubjectSkills = await this.db.subjectSkills.findAll();
      res.json(AllSubjectSkills);
    } catch (error) {
      res.status(400).json(`Error: ${error}`);
    }
  };

  getAllClassSkills = async (req, res) => {
    try {
      const AllClassSkills = await this.db.classSkills.findAll();
      res.json(AllClassSkills);
    } catch (error) {
      res.status(400).json(`Error: ${error}`);
    }
  };

  getAllFeedback = async (req, res) => {
    try {
      const AllFeedback = await this.db.feedback.findAll();
      res.json(AllFeedback);
    } catch (error) {
      res.status(400).json(`Error: ${error}`);
    }
  };

  getAllTeacherStudentClasses = async (req, res) => {
    try {
      const AllTeacherStudentClasses =
        await this.db.teacherStudentClasses.findAll();
      res.json(AllTeacherStudentClasses);
    } catch (error) {
      res.status(400).json(`Error: ${error}`);
    }
  };
}
module.exports = TeacherController;
