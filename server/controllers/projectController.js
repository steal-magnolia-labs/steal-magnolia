const db = require('../database');

const projectController = {};

projectController.getAllProjects = (req, res) => {
  const userId = req.cookies.user_id;
  db.many('SELECT * FROM projects WHERE user_id = $1', userId)
    .then((data) => {
      console.log('Project info retrieved from db: ', data);
      res.json(data);
    })
    .catch(error => res.send('Error getting project list: ', error));
};

projectController.newProject = (req, res) => {
  const userId = req.cookies.user_id;
  db.one(`INSERT INTO projects(user_id, name) 
          VALUES($1, $2) 
          RETURNING "id", "user_id", "name", "created_at";`,
  [userId, 'New Project'])
    .then((newProj) => {
      const projId = newProj.id;
      db.one(`INSERT INTO nodes(project_id, name) 
              VALUES($1, $2) 
              RETURNING "id", "project_id", "parent_id", "name", "stateful", "state", "props", "count";`,
      [projId, 'App'])
        .then(data => res.json(data))
        .catch(error => console.log('New project node error: ', error));
    })
    .catch(error => console.log('New project entry error:', error));
};

projectController.updateProject = (req, res) => {
  const updatedProject = req.body.projectInfo;
  const {
    id, projectId, parentId, name, stateful, state, props, count,
  } = updatedProject;

  db.one(`UPDATE nodes
          SET project_id = $2, parent_id = $3, name = $4, stateful = $5, state = $6, props = $7, count = $8
          WHERE id = $1;`,
  [id, projectId, parentId, name, stateful, state, props, count])
    .then((data) => {
      console.log(data);
      return res.json(data);
    });
};

projectController.retrieveProject = (req, res) => {
  const projectId = req.params.projectid;
  db.many('SELECT * FROM nodes WHERE project_id = $1', projectId)
    .then((data) => {
      console.log(data);
      return res.json(data);
    });
};

projectController.newNode = (req, res) => {
  const projectId = req.params.projectid;
  const parentId = req.body.parent_id;

  db.one(`INSERT INTO nodes(project_id, parent_id, name) 
  VALUES($1, $2, $3) 
  RETURNING "id", "project_id", "parent_id", "name", "stateful", "state", "props", "count";`,
  [projectId, parentId, 'App'])
    .then(data => res.json(data))
    .catch(error => console.log('New project node error: ', error));  
}

module.exports = projectController;
