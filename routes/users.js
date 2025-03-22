const express = require('express');
const router = express.Router();
const User = require('../model/user');
const passport = require('passport');
const asyncWrapper = require('../utils/asyncWrapper');
const { storeReturnTo } = require('../middleware.js');
const auth = require('../controllers/auth.js');

router.route('/register')
    .get(auth.renderRegister)
    .post(asyncWrapper(auth.register))

router.route('/login')
    .get(auth.renderLogin)
    .post(storeReturnTo,
        passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
        auth.login);

router.get('/logout', auth.logout);

module.exports = router;