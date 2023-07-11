const jwtSecret = 'your_jwt_secret'; // This has to be the same key used in the JWTStrategy
const jwt = require('jsonwebtoken'),
  passport = require('passport');

require('./passport'); // Your local passport file


let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.username, // This is the username you’re encoding in the JWT
    expiresIn: '7d', // This specifies that the token will expire in 7 days
    algorithm: 'HS256' // This is the algorithm used to “sign” or encode the values of the JWT
  });
}


/* POST login. */
module.exports = (router) => {
  router.post('/login', (req, res) => {
    console.log('Login attempt');
    passport.authenticate('local', {session: false}, (error, user, info) => {
      console.log('Inside passport authenticate');
      if (error || !user) {
        console.log('Authentication error or no user: ', error);
        res.status(400).json({message: 'Something is not right', user: user});
      } else {
        req.login(user, {session: false}, (error) => {
          console.log('Inside req.login');
          if (error) {
            console.log('Error in req.login: ', error);
            res.send(error);
          } else {
            const token = jwt.sign({id: user.id}, jwtSecret, {expiresIn: '2m'});
            console.log('Token generated: ', token);
            res.json({user, token});
          }
        });
      }
    })(req, res);
  });
}