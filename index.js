require('./environment');
const cors = require('cors');
const express = require('express');
const { auth } = require('express-oauth2-jwt-bearer');
const app = express();
const loggerMiddleware = require('./middlewares/logger.middleware');
const TeacherRouter = require('./routers/teacher.route');
const PORT = process.env.PORT || 3000;

// const jwtCheck = auth({
//   audience: process.env.AUDIENCE,
//   issuerBaseURL: process.env.ISSUERBASEURL,
//   tokenSigningAlg: process.env.TOKENSIGNINGALG,
// });

// app.use(jwtCheck);
app.use(loggerMiddleware);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const routers = [new TeacherRouter()];

routers.forEach((router) => app.use('/', router.router));

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
