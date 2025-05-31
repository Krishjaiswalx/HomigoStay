const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../views/middleware/auth");

router.get("/signup", (req, res) => {
    res.render("./users/signup.ejs");
});

router.get("/login", (req, res) => {
    res.render("./users/login.ejs");
});

router.post("/signup", wrapAsync(async (req, res) => {
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
}));

router.post("/login", 
    saveRedirectUrl,
    passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), async (req, res) => {
    req.flash("success", "Welcome Back To Homigo!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
});

router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            next();
        }
        req.flash("success", "You are Logged out");
        return res.redirect("/listings");
    })
});

module.exports = router;