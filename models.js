const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * Represents a movie schema.
 * @type {mongoose.Schema}
 */
let movieSchema = mongoose.Schema({
    /** The title of the movie. */
    title: {type: String, required: true},

    /** The description of the movie. */
    description: {type: String, required: true},

    /** The genre of the movie. */
    genre: {
        /** The name of the genre. */
        name: String,

        /** The description of the genre. */
        description: String,
    },

    /** The director of the movie. */
    director: {
        /** The name of the director. */
        name: String,

        /** The biography of the director. */
        bio: String,

        // Birth: String,
        // Death: String
    },

    /** The list of actors in the movie. */
    actors: [String],

    /** The image URL of the movie. */
    imageUrl: String,

    /** Indicates if the movie is featured or not. */
    featured: Boolean
});

/**
 * Represents a user schema.
 * @type {mongoose.Schema}
 */
let userSchema = mongoose.Schema({
    /** The username of the user. */
    username: {type: String, required: true},

    /** The password of the user. */
    password: {type: String, required: true},

    /** The email address of the user. */
    email: {type: String, required: true},

    /** The birthday of the user. */
    birthday: Date,

    /** The list of favorite movies of the user. */
    favoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

/**
 * Hashes the user's password.
 * @param {string} password - The password to hash.
 * @returns {string} The hashed password.
 */
userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

/**
 * Validates the user's password.
 * @param {string} password - The password to validate.
 * @returns {boolean} True if the password is valid, otherwise false.
 */
userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

/** Represents the Movie model. */
let Movie = mongoose.model('Movie', movieSchema);

/** Represents the User model. */
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
