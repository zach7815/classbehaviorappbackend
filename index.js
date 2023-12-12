require('./environment');
const cors = require('cors');
const express = require('express');

const loggerMiddleware = require('./middlewares/logger.middleware');
const TeacherRouter = require('./routers/teacher.route');

const app = express();
app.use(loggerMiddleware);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

const routers = [new TeacherRouter()];

routers.forEach((router) => app.use('/', router.router));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
