const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * Create User and save into database
 */
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide your username'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide your password'],
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

/**
 *  Before save the password encrypt it with bcrypt 
 *  Why arrow function is not working here??
 */
UserSchema.pre('save', function(next) {
     const user = this;
     bcrypt.hash(user.password, saltRounds, function (error, encrypted) {
        user.password = encrypted;
        next();
     })
})

const User = mongoose.model('User', UserSchema);

module.exports = User;