const express = require('express');
const passport = require('passport');

const { login, register, getCurrent } = require('../../controllers/auth');
const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  getCurrent
);

module.exports = router;
