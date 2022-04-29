const express = require('express');
const bodyParser = require('body-parser');
const toDoRoute = require('./to-dos');
const app = express();

app.use(bodyParser.json());
app.use('/to-do', toDoRoute);

// Listening to the server
app.listen(4000);