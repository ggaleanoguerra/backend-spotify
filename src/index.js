const express = require('express');
require('dotenv').config();
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(cors());

app.use('/', routes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
