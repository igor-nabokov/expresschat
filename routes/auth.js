const express = require("express");
const passport = require('passport');

const router = express.Router();

router.get('/login', (req, res) => {
    if (req.user) {
        // send user data
        res.send({"id": "12345", "login": "kem", "firstname": "Taras", "lastname": "Gaidukov", "email": "kemaweyan@gmail.com", "avatar": "userpic.png"});
    } else {
        res.status(401).send({error: req.flash('error')});
    }
});

router.post('/login', passport.authenticate('local', {failureRedirect: '/login', failureFlash: true}), (req, res) => {
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.send({"id": "12345", "login": "kem", "firstname": "Taras", "lastname": "Gaidukov"});
    });
});

router.post('/logout', (req, res) => {
    // get a logout request
});

router.post('/register', (req, res) => {
    // process a registration form
});

module.exports = router;
