
const projectController = {}

projectController.newProject = (req, res, next) => {
  const userId = req.body.user_id;
  // create new project with userID in db

  const newProject = {
    project_id: 1,
    head_id: 2,
    stateful: false,
    state_props: {},
    count: 1,
  };
  return res.json(newProject);
};

module.exports = projectController;
