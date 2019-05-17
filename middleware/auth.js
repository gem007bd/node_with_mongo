const mongoose = require('mongoose');

const User = require('../database/models/User');

module.exports = (req, res, next) => {

    // fetch user from database
    User.findById(req.session.userId, (error, user) => {
        if (error || !user) {
            res.redirect('/'); 
        } 
    });
    // verify user

    //if user is valid, permit request

    // else redirect

}