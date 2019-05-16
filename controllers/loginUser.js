const bcrypt = require('bcrypt');
const User = require('../database/models/User');

module.exports = (req, res) => {

    //Get the value from the request 
    const { email, password } = req.body;

    // Try to find the user
    User.findOne({email: email}, (error, user) => {
        if(user) {
            // Compare user password
            bcrypt.compare(password, user.password, (error, same) => {
                if(same) {
                    req.session.userId = user._id;
                    // If user password is correct , then, login user.
                    return res.redirect('/');
                } else {
                    return res.redirect('/auth/login');
                }
            });
        } else {
            // redirect user back.
            return res.redirect('/auth/login');
        }
    });
}