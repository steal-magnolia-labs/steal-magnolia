const db = require('../database');
// const treeTools = require('./tree-constructor');

const projectController = {};


function buildTree(dbRows) {
  // Constructor function for new nodes
  function TreeNode(node) {
    this.id = node.id;
    this.project_id = node.project_id;
    this.parent_id = node.parent_id;
    this.name = node.name;
    this.stateful = node.stateful;
    this.props = node.props;
    this.count = node.count;

    this.children = [];
  }
  // Method to insert a new node in the proper place in the tree structure (recursively if necessary)
  TreeNode.prototype.add = function add(node) {
    if (node.parent_id === this.id) return this.children.push(node);
    return this.children.forEach(child => child.add(node));
  };
  const root = new TreeNode(dbRows.shift());
  // Iterate through dbRows, turning each database entry into a TreeNode, and inserting them via the root
  dbRows.forEach((row) => {
    const nodeToInsert = new TreeNode(row);
    root.add(nodeToInsert);
  });
  return root;
}

projectController.getAllProjects = (req, res) => {
  const userId = (req.cookies.id || 11);
  console.log(userId);
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
  const userId = (req.cookies.id || 11);
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
        .then((data) => {
          // console.log('before building tree with data, data is: ', data);
          // res.json(data);
          const populatedTree = buildTree([data]);
          res.json(populatedTree);
        })
        .catch(error => console.log('New project node error: ', error));
    })
    .catch(error => console.log('New project entry error:', error));
};

projectController.updateProject = (req, res) => {
  const {
    id, name, stateful, props, count,
  } = req.body;

  db.one(`UPDATE nodes
          SET name = $2, stateful = $3, props = $4, count = $5
          WHERE id = $1;`,
  [id, name, stateful, props, count])
    .then((data) => {
      return res.json(data);
    })
    .catch(err => console.log(' error is ', err));
    // db.many(`SELECT * FROM nodes 
    // WHERE project_id = $1
    // ORDER BY id`, projectId)
    //   .then((data) => {
    //     const populatedTree = buildTree(data);
    //     res.json(populatedTree);
    //   });
};

projectController.retrieveProject = (req, res) => {
  const projectId = req.params.projectid;
  db.many(`SELECT * FROM nodes 
           WHERE project_id = $1
           ORDER BY id`, projectId)
    .then((data) => {
      const populatedTree = buildTree(data);
      console.log('populated tree is ', populatedTree);
      res.json(populatedTree);
    });
};

projectController.newNode = (req, res) => {
  const projectId = req.params.projectid;
  const parentId = req.body.parent_id;

  db.one(`INSERT INTO nodes(project_id, parent_id, name) 
  VALUES($1, $2, $3) 
  RETURNING "id", "project_id", "parent_id", "name", "stateful", "state", "props", "count";`,
  [projectId, parentId, 'App'])
    .then((data) => {
      db.many(`SELECT * FROM nodes 
      WHERE project_id = $1
      ORDER BY id`, projectId)
        .then((data) => {
          const populatedTree = buildTree(data);
          console.log('populated tree is ', populatedTree);
          res.json(populatedTree);
        });
    })
    .catch(error => console.log('New project node error: ', error));  
};

module.exports = projectController;
