/**
 * Always consider the locaiton of the file
 */
const User = require('../database/models/User');

module.exports = (req, res, next) => {
    User.create(req.body, (error, user) => {
            if(error) {
                return res.redirect('/auth/register');
            }
            res.redirect('/');
    });
}