const cors = require('cors');
const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT;

const app = express();

app.use(cors());

// Enable reading JSON request bodies
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
