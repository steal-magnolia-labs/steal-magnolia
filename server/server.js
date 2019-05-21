const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const projectController = require('./controllers/projectController.js');
const userController = require('./controllers/user-controller.js');
const authController = require('./controllers/google-auth-controller');

// const db = require('./database');
// Example query to show database is connected
// db.any(`SELECT * FROM nodes`).then(data => console.log(data));

const app = express();
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/build', express.static(path.join(__dirname, '../build')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));
app.get('/client/style.css', (req, res) => res.sendFile(path.join(__dirname, '../client/style.css')));

// Routes dealing with users
app.get('/google-init', authController.getCode);
app.get('/homepage', authController.getToken, userController.logInUser);
app.get('/logout', userController.logOutUser);
// app.get('/projectspage')

// Routes dealing with projects
app.get('/projects/:projectid', projectController.retrieveProject);
app.get('/getallprojects', projectController.getAllProjects);
app.post('/newproject', projectController.newProject);
app.post('/updateproject/:projectid', projectController.updateProject);
app.post('/newnode/:projectid', projectController.newNode);

// Catch-all for React router
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './../index.html')));


app.listen(3000, () => console.log('Listening on port 3000...'));
