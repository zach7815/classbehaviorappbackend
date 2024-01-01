class TeacherController {
  constructor(db) {
    this.db = db;
  }

  giveStudentsFeedback = async (req, res) => {
    const {
      student_id,
      class_id,
      teacher_id,
      skill_id,
      feedback_comment,
      skill_value,
    } = req.body;

    try {
      const feedbackForeignKey = await this.db.teacherStudentClasses.findOne({
        where: {
          teacher_id: teacher_id,
          class_id: class_id,
          student_id: student_id,
        },
        attributes: ['id'],
      });

      const extractedFeedbackForeignKey = feedbackForeignKey.getDataValue('id');

      const newFeedback = {
        teacher_student_classes_id: extractedFeedbackForeignKey,
        skill_id: skill_id,
        feedback_comment: feedback_comment,
        feedback_date: new Date(),
        skills_value: skill_value,
      };

      await this.db.feedback.create(newFeedback);

      res.status(200).json('feedback successfully added');
    } catch (error) {
      res.status(400).json(`Error: ${error}`);
    }
  };

  getClassFeedback = async (req, res) => {
    const { class_id } = req.body;
    const classFeedbackData = {};

    try {
      const classMeta = await this.db.classes.findOne({
        where: { id: class_id },
      });
      const extractedClass = classMeta.get();

      //* gets class_info data and subject name for classData

      const subjectName = await this.db.subjects.findOne({
        where: { id: extractedClass['subject_id'] },
      });
      const subjectId = subjectName.getDataValue('subject_id');

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

      //* get all

      const classFeedback = await this.db.feedback.findAll({
        where: { teacher_student_classes_id: class_id },
      });

      const extractedFeedback = classFeedback.map((feedback) => {
        return {
          id: feedback.dataValues.id,
          teacher_student_classes_id:
            feedback.dataValues.teacher_student_classes_id,
          skill_id: feedback.dataValues.skill_id,
          feedback_date: feedback.dataValues.feedback_date,
          feedback_comment: feedback.dataValues.feedback_comment,
          skills_value: feedback.dataValues.skills_value,
          createdAt: feedback.dataValues.createdAt,
          updatedAt: feedback.dataValues.updatedAt,
          skillId: feedback.dataValues.skillId,
        };
      });

      const classRows = await this.db.teacherStudentClasses.findAll({
        attributes: ['id'],
        group: ['id'],
        where: { class_id: class_id },
      });

      const extractedClassRows = classRows.map((row) => {
        return row.dataValues.id;
      });
      console.log(extractedClassRows);

      const feedback = await this.db.feedback.findAll({
        where: { teacher_student_classes_id: extractedClassRows },
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

        attributes: [
          'id',
          'teacher_student_classes_id',
          'skill_id',
          'feedback_comment',
          'skills_value',
          'feedback_date',
        ],
      });

      const students = [];
      const studentSet = new Set();
      feedback.forEach((feedback) => {
        const feedbackItem = {
          skill_id: feedback.dataValues.skill_id,
          skill_name: '',
          skills_value: feedback.dataValues.skills_value,
          feedback_comment: feedback.dataValues.feedback_comment,
          feedback_date: feedback.dataValues.feedback_date,
        };

        const student_id = feedback.dataValues.teacherStudentClass.student_id;

        if (studentSet.has(student_id)) {
          const targetStudent = students.find((student) => {
            return student.student_id === student_id;
          });
          targetStudent.recent_feedback.push(feedbackItem);
        } else {
          studentSet.add(student_id);
          const newStudent = {
            student_id: feedback.dataValues.teacherStudentClass.student.id,
            first_name:
              feedback.dataValues.teacherStudentClass.student.first_name,
            last_name:
              feedback.dataValues.teacherStudentClass.student.last_name,
            net_feedback_score: '',
            recent_feedback: [feedbackItem],
          };
          students.push(newStudent);
        }
      });

      students.forEach((student) => {
        student['net_feedback_score'] = student['recent_feedback'].reduce(
          (ac, cv) => {
            return ac + cv.skills_value;
          },
          0
        );
      });

      const skillNames = await this.db.skills.findAll({
        attributes: ['id', 'skill_name'],
      });

      const skillsDictionary = skillNames.reduce((dictionary, skill) => {
        dictionary[skill.dataValues.id] = skill.dataValues.skill_name;
        return dictionary;
      }, {});

      students.forEach((student) => {
        return student.recent_feedback.forEach((feedback) => {
          return (feedback.skill_name = skillsDictionary[feedback.skill_id]);
        });
      });

      classFeedbackData.students = students;
      console.log(extractedFeedback);

      const totalClassFeedbackScore = students.reduce((ac, cv) => {
        const skillsValue = cv.net_feedback_score;
        return ac + skillsValue;
      }, 0);

      classFeedbackData.classFeedbackTotal = totalClassFeedbackScore;

      res.status(200).json(classFeedbackData);
    } catch (error) {
      res.status(400).json(`Error:${error}`);
    }
  };

  getClassSkills = async (req, res) => {
    const { class_id } = req.body;
    try {
      const classSkills = await this.db.classSkills.findAll({
        where: { class_id: class_id },
      });

      res.status(200).json(classSkills);
    } catch (error) {
      res
        .status(400)
        .json(
          `Error: unable to get class skills of class id: ${class_id}: ${error}`
        );
    }
  };

  //*add student to student table
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
      const { class_name, subject_id, grade, teacher_id, students, skills } =
        req.body;
      const classToAdd = {
        class_name: class_name,
        subject_id: subject_id,
        grade: grade,
      };

      const newClass = await this.db.classes.create(classToAdd);
      console.log(newClass.id);

      const newTeacherStudentClassEntry = students.map((student) => {
        return {
          teacher_id: teacher_id,
          class_id: newClass.id,
          role_id: 1,
          student_id: student,
        };
      });

      const newClassSkillsEntry = skills.map((skill) => {
        return {
          skills_id: skill,
          class_id: newClass.id,
        };
      });

      await this.db.classSkills.bulkCreate(newClassSkillsEntry);

      await this.db.teacherStudentClasses.bulkCreate(
        newTeacherStudentClassEntry
      );

      res.status(200).json(newClass);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

  addTeacherToClass = async (req, res) => {
    const { class_id, teacher_id, role_id } = req.body;

    try {
      const students = await this.db.teacherStudentClasses.findAll({
        attributes: [`student_id`],
        group: ['student_id'],
        where: { class_id },
      });
      const studentIds = students.map(({ student_id }) => student_id);

      const newTeacherStudentClassEntry = studentIds.map((student) => {
        return {
          teacher_id: teacher_id,
          class_id: class_id,
          role_id: role_id,
          student_id: student,
        };
      });

      await this.db.teacherStudentClasses.bulkCreate(
        newTeacherStudentClassEntry
      );

      res.status(200).json(`successfully added ${teacher_id} to ${class_id}`);

      console.log(students);
    } catch (error) {
      res
        .status(400)
        .json(
          `error in adding teacher: ${teacher_id} to class: ${class_id}: ${error}`
        );
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

  createSkill = async (req, res) => {
    const { skillName } = req.body;
    try {
      const newSkill = {
        skill_name: skillName,
      };
      await this.db.skills.create(newSkill);
      res.status(200).json(' new skill successfully added');
    } catch (error) {
      res.status(400).json(`failed to add due to: ${error}`);
    }
  };

  addTeacher = async (req, res) => {
    const { firstName, lastName, emailAddress } = req.body;

    try {
      const newTeacher = {
        first_name: firstName,
        last_name: lastName,
        email_address: emailAddress,
      };

      await this.db.teachers.create(newTeacher);

      res.status(200).json('teacher successfully added');
    } catch (error) {
      res.status(400).json(`unable to add a teacher due to: ${error}`);
    }
  };

  updateSkill = async (req, res) => {
    const { id, skillName } = req.body;

    try {
      await this.db.skills.update(
        {
          skill_name: skillName,
        },
        {
          where: { id: id },
          fields: ['skill_name'],
        }
      );

      const updatedRow = await this.db.skills.findByPk(id);
      res.status(200).json(updatedRow);
    } catch (error) {
      res
        .status(400)
        .json(`error unable to update ${id} in skills table, error: ${error}`);
    }
  };

  updateFeedback = async (req, res) => {
    const {
      id,
      teacherStudentClassesId,
      skillId,
      feedbackComment,
      skillsValue,
    } = req.body;

    console.log(teacherStudentClassesId, skillsValue);
    try {
      const updates = {};
      if (teacherStudentClassesId !== undefined) {
        updates.teacher_student_classes_id = teacherStudentClassesId;
      }
      if (skillId !== undefined) {
        updates.skill_id = skillId;
      }

      if (feedbackComment !== undefined) {
        updates.feedback_comment = feedbackComment;
      }
      if (skillsValue !== undefined) {
        updates.skills_value = skillsValue;
      }

      console.log(updates);

      await this.db.feedback.update(updates, {
        where: { id: id },
      });

      res.status(200).json(`Feedback with id ${id} successfully updated.`);
    } catch (error) {
      res
        .status(400)
        .json(`Feedback update failed for feedback id: ${id}: ${error}`);
    }
  };
}
module.exports = TeacherController;
