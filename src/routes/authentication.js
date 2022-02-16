const express = require('express');
const { route } = require('.');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/adminsignup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup');
    
});

router.post('/adminsignup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/adminsignup',
    failureFlash: true
}));

router.get('/signin', (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/portfolio',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
  });

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/signin');
})

module.exports = router;