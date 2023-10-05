const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Models = require('./models.js'),
  passportJWT = require('passport-jwt');

/**
 * The User model from the models module.
 * @type {Object}
 */
let Users = Models.User,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

/**
 * Local strategy for authenticating a user using a username and password.
 * This strategy is used during the login process.
 */
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, 
  /**
   * @param {string} username - The username provided by the user.
   * @param {string} password - The password provided by the user.
   * @param {function} callback - A callback to be executed once authentication is done.
   */
  (username, password, callback) => {
    Users.findOne({ username: username })
      .then(user => {
        if (!user) {
          console.log('incorrect username');
          return callback(null, false, {message: 'Incorrect username or password.'});
        }

        if (!user.validatePassword(password)) {
          console.log('incorrect password');
          return callback(null, false, {message: 'Incorrect password.'});
        }
  
        console.log('finished');
        return callback(null, user);
      })
      .catch(error => {
        console.log(error);
        return callback(error);
      });
  }
));

/**
 * JWT strategy for handling JWT-based authentication.
 * This strategy is used for protected routes that require a valid JWT token.
 */
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
}, 
  /**
   * @param {Object} jwtPayload - The decoded JWT payload.
   * @param {function} callback - A callback to be executed once the JWT is verified.
   */
  (jwtPayload, callback) => {
    return Users.findById(jwtPayload._id)
      .then((user) => {
        return callback(null, user);
      })
      .catch((error) => {
        return callback(error);
      });
  }
));
