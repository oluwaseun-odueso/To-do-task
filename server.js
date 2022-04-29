const express = require('express');
const bodyParser = require('body-parser');
const toDoRoute = require('./to-dos')
const app = express();

app.use(bodyParser.json());
app.use('/todo', toDoRoute);

app.listen(4000); 