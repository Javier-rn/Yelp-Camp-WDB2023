const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');

router.get('/register', (req, res) => {
  res.render('users/register');
});

router.post(
  '/register',
  catchAsync(async (req, res) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash('success', 'Welcome to Yelp Camp!');
        res.redirect('/campgrounds');
      });
    } catch (e) {
      req.flash('success', e.message);
      res.redirect('/register');
    }
  })
);

router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post(
  '/login',
  passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
    keepSessionInfo: true,
  }),
  (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
  }
);

router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    } else {
      req.flash('success', 'Goodbye!');
      res.redirect('/campgrounds');
    }
  });
});

module.exports = router;