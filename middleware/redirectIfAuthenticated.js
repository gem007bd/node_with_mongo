const mongoose = require('mongoose');

const User = require('../database/models/User');

module.exports = (req, res, next) => {
    if(req.session.userId) {
        return res.redirect('/');
    }
    next()
}