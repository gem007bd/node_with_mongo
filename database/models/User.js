const mongoose = require('mongoose');


// Users, Posts, Products

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;