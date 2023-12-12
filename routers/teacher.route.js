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
  };
}
module.exports = TeacherRouter;
