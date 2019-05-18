const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const projectController = require('./controllers/projectController.js');

const app = express();

app.use(bodyParser.json());

app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

app.post('/newproject', projectController.newProject);

app.get('*', (req, res) => res.sendFile(path.join(__dirname, './../index.html')));

app.listen(3000, () => console.log('Listening on port 3000...'));
