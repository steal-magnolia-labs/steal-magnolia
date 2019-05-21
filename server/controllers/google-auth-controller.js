const axios = require('axios');

const authController = {}
const clientID = '367617815829-730pkn7dkfaupsji6eon9b33vhpc8gru.apps.googleusercontent.com';
const clientSecret = 'Zerdhm_ou81oh_aUDYAoaNBV';

authController.getCode = (req, res, next) => {
    console.log(' in the auth controller ')
    axios.get('https://accounts.google.com/o/oauth2/v2/auth?client_id=367617815829-730pkn7dkfaupsji6eon9b33vhpc8gru.apps.googleusercontent.com&response_type=code&scope=openid%20email&redirect_uri=http://localhost:3000/homepage')
    .then((response) => {
        res.send(response.data);
    })
    .catch((error) => {
        console.log('Error in getting the code:', error);
    });
}

authController.getToken = (req, res, next) => {
    const code = req.query.code;
   // const sessionState = req.query.session_state;
    axios.post(`https://www.googleapis.com/oauth2/v4/token?code=${code}&client_id=367617815829-730pkn7dkfaupsji6eon9b33vhpc8gru.apps.googleusercontent.com&client_secret=Zerdhm_ou81oh_aUDYAoaNBV&redirect_uri=http://localhost:3000/homepage&grant_type=authorization_code&Content-Type=application/x-www-form-urlencoded`)
    .then(response => {
        let jwt = response.data.id_token;
        jwt = jwt.split('.')[1];
        const base64 = Buffer.from(jwt, 'base64').toString();
        const email = JSON.parse(base64).email;
        res.locals.email = email;
        res.cookie('email', email);
        res.cookie('jwt', jwt, { expires: new Date(Date.now() + 900000) });
        return next();
    })
    .catch((err) => {console.log('The error in getting the Token', err)})
}

module.exports = authController;