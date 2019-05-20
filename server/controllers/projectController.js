const db = require('../database');

const projectController = {};

projectController.getAllProjects = (req, res) => {
  const userId = req.cookies.id;
  db.many('SELECT * FROM projects WHERE user_id = $1', userId)
    .then((data) => {
      console.log('Project info retrieved from db: ', data);
      const response = data.map((proj) => {
        const formatted = {
          project_id: proj.id,
          project_name: proj.name,
        };
        return formatted;
      });
      res.json(response);
    })
    .catch(error => res.send('Error getting project list: ', error));
};

projectController.newProject = (req, res) => {
  const userId = req.cookies.id;
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

  const {
    id, name, stateful, props, count,
  } = req.body;

  console.log(' req body in update ', req.body)

  db.one(`UPDATE nodes
          SET name = $2, stateful = $3, props = $4, count = $5
          WHERE id = $1;`,
  [id, name, stateful, props, count])
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
