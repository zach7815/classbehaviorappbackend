const Router = require('express');
const TeacherController = require('../controllers/teacher.controller');
const db = require('../db/models/index.js');

class TeacherRouter {
  path = '/teachers';
  router = Router();

  controller = new TeacherController(db);
  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes = () => {
    this.router.post(`${this.path}/classes`, this.controller.createClass);
    this.router.post(`${this.path}/students/add`, this.controller.addStudent);
    this.router.post(
      `${this.path}/addStudentsToClass`,
      this.controller.addStudentsToClass
    );
    this.router.post(
      `${this.path}/removeStudentsFromClass`,
      this.controller.removeStudentsFromClass
    );
    this.router.get(
      `${this.path}/students/getAll`,
      this.controller.getAllStudents
    );
    this.router.get(`${this.path}/getAll`, this.controller.getAllTeachers);
    this.router.get(`${this.path}/skills/getAll`, this.controller.getAllSkills);
    this.router.get(
      `${this.path}/subjects/getAll`,
      this.controller.getAllSubjects
    );
    this.router.get(
      `${this.path}/classes/getAll`,
      this.controller.getAllClasses
    );
    this.router.get(
      `${this.path}/subjectSkills/getAll`,
      this.controller.getAllSubjectSkills
    );
    this.router.get(
      `${this.path}/teachingRoles/getAll`,
      this.controller.getAllTeachingRoles
    );
    this.router.get(
      `${this.path}/classSkills/getAll`,
      this.controller.getAllClassSkills
    );
    this.router.get(
      `${this.path}/feedback/getAll`,
      this.controller.getAllFeedback
    );

    this.router.get(
      `${this.path}/teacherStudentClasses/getAll`,
      this.controller.getAllTeacherStudentClasses
    );

    this.router.get(
      `${this.path}/class/feedback/getAll`,
      this.controller.getClassFeedback
    );
  };
}

module.exports = TeacherRouter;
