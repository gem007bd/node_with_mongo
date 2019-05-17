/**
 * Always consider the locaiton of the file
 */
const User = require('../database/models/User');
// Don't know why in this tutoial this const is not needed here???!
const message = 'is required';

module.exports = (req, res, next) => {
    User.create(req.body, (error, user) => {
            if(error) {
                const registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message); 
                req.flash('registrationErrors', registrationErrors);
                req.flash('data', req.body);
                return res.redirect('/auth/register');
            }
            res.redirect('/');
    });
}