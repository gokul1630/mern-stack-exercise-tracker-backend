const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exercise = require('./routes/Exercise');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 10;
const URL = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());

mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });

const dataBase = mongoose.connection;

dataBase.once('open', () => {
  console.log('Database Connected');
});

dataBase.on('error', console.error.bind(console, 'Error'));

const users = require('./routes/User');

app.use('/users', users);
app.use('/exercises', exercise);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
