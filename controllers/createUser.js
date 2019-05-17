module.exports = (req, res) => {
    res.render('register', {
        // send the error message to the user page
        errors: req.flash('registrationErrors'),
        // Don't know why this f**cking error is not working to the register.edge page
        data: req.flash('data')[0]
    });
}