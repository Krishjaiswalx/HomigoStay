const User = require("../models/user.js");

module.exports.renderSignUp = (req, res) => {
    res.render("./users/signup.ejs");
}
module.exports.renderLogin = (req, res) => {
    res.render("./users/login.ejs");
}

module.exports.signUp = async (req, res) => {
    try {
        let { username, password, email } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome To Homigo!");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome Back To Homigo!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            next();
        }
        req.flash("success", "You are Logged out");
        return res.redirect("/listings");
    })
}

