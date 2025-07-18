const User = require('../model/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email: email, username: username });
        const hashedUser = await User.register(user, password);
        req.logIn(hashedUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    delete res.locals.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logOut((err) => {
        if (!err) {
            req.flash('success', 'Goodbye!');
            res.redirect('/campgrounds');
        } else {
            req.flash('error', err);
        }
    });
}