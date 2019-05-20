const db = require('../database');

const userController = {};

userController.logInUser = (req, res) => {
  const { email } = res.locals;
  db.one(`SELECT * FROM users
          WHERE email=$1;`, email)
    .then(data => res.json(data.id))
    .catch((error) => {
      db.one(`INSERT INTO users(email)
              VALUES($1) RETURNING id`, email)
        .then((data) => {
          console.log('Successful user creation - your id is: ', data.id);
          res.cookie('id', data.id);
          res.redirect('/projectpage');
          // Send user to homepage (how? res.sendFile(path.join(__dirname, './../index.html')) ?)
        });
    });
};

userController.logOutUser = (req, res) => {
  res.clearCookie('jwt');
  res.clearCookie('email');
  res.redirect('/');
};

module.exports = userController;
