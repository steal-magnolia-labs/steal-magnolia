const db = require('../database');
// const treeTools = require('./tree-constructor');

const projectController = {};

function buildTree (dbRows) {
  // Constructor function for new nodes
  function TreeNode (node) {
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
  TreeNode.prototype.add = function add (node) {
    if (node.parent_id === this.id) return this.children.push(node);
    return this.children.forEach(child => child.add(node));
  };

  const root = new TreeNode(dbRows.shift());

  // Iterate through dbRows, turning each database entry into a TreeNode, and inserting them via the root
  dbRows.forEach(row => {
    const nodeToInsert = new TreeNode(row);
    root.add(nodeToInsert);
  });

  return root;
}

projectController.getAllProjects = (req, res) => {
  const base64 = Buffer.from(req.cookies.jwt, 'base64').toString();
  // console.log(base64);
  const { email } = JSON.parse(base64);
  // const userId = req.cookies.id;

  // console.log('this is the email', email);
  if (email === undefined) {
    res.status(403);
    res.send();
  }
  db.many('SELECT projects.* FROM projects join users on (projects.user_id = users.id) WHERE email = $1', email)
    .then(data => {
      console.log('Project info retrieved from db: ', data);
      const response = data.map(proj => {
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
  db.one(
    `INSERT INTO projects(user_id, name) 
          VALUES($1, $2) 
          RETURNING "id", "user_id", "name", "created_at";`,
    [userId, 'New Project']
  )
    .then(newProj => {
      const projId = newProj.id;
      db.one(
        `INSERT INTO nodes(project_id, name) 
              VALUES($1, $2) 
              RETURNING "id", "project_id", "parent_id", "name", "stateful", "state", "props", "count";`,
        [projId, 'App']
      )
        .then(data => {
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
  const { id, name, stateful, props, count } = req.body;
  let props2;
  if (props === '') {
    props2 = null;
  } else if (typeof props2 === 'number') {
    props2 = props;
  } else {
    props2 = `'"${props}"'`;
  }

  const yoQuery = `UPDATE nodes
     SET name = '${name}', stateful = ${stateful}, props = ${props2}, count = ${count}
     WHERE id = ${id};`;

  db.query(yoQuery)
    .then(resp => {
      if (resp.length !== 0) console.log('the response is:', resp);
    })
    .catch(err => {
      console.log('Your database update query was:', yoQuery);
      console.log(' error is ', err);
    });
  // db.many(`SELECT * FROM nodes
  // WHERE project_id = $1
  // ORDER BY id`, projectId)
  //   .then((data) => {
  //     const populatedTree = buildTree(data);
  //     res.json(populatedTree);
  //   });
};

projectController.updateProjectName = (req, res) => {
  const { id, name } = req.body;
  const yoQuery = `UPDATE projects
     SET name = '${name}'
     WHERE id = ${id};`
  db.query(yoQuery)
    .then(resp => {
      if (resp.length !== 0) console.log('the response is:', resp)
    })
    .catch(err => {
      console.log('Your database update query was:', yoQuery);
      console.log(' error is ', err);
    });
};

projectController.retrieveProjectName = (req, res) => {
  const projectId = req.params.projectid;
  db.query(
    `SELECT name FROM projects 
           WHERE id = $1;`,
    projectId
  ).then(data => {
    console.log('data ', data)
    res.json(data);
  })
    .catch(err => {
      console.log('error in retrieving name: ', err);
    });
};

projectController.retrieveProject = (req, res) => {
  const base64 = Buffer.from(req.cookies.jwt, 'base64').toString();
  const { email } = JSON.parse(base64);

  const projectId = req.params.projectid;
  db.many(
    `SELECT nodes.*
     FROM nodes 
     join projects on(projects.id = nodes.project_id)
     join users on(users.id = projects.user_id)
     WHERE project_id = $1
     AND email = $2
     ORDER BY id;`,
    [projectId, email]
  ).then(data => {
    const populatedTree = buildTree(data);
    console.log('populated tree is ', populatedTree);
    res.json(populatedTree);
  }).catch(() => res.json({}));
};

projectController.newNode = (req, res) => {
  const projectId = req.params.projectid;
  const parentId = req.body.parent_id;
  if (parentId !== '') {
    console.log('I happend');
    db.one(
      `INSERT INTO nodes(project_id, parent_id, name) 
  VALUES($1, $2, $3) 
  RETURNING "id", "project_id", "parent_id", "name", "stateful", "state", "props", "count";`,
      [projectId, parentId, 'App']
    )
      .then(data => {
        console.log('insert query result', data);
        db.many(
          `SELECT * FROM nodes 
      WHERE project_id = $1
      ORDER BY id`,
          projectId
        ).then(data => {
          const populatedTree = buildTree(data);
          console.log('populated tree is ', populatedTree);
          res.json(populatedTree);
        });
      })
      .catch(error => console.log('New project node error: ', error));
  } else {
    return res.end();
  }
};

module.exports = projectController;
