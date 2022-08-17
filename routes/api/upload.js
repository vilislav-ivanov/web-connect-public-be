const path = require('path');
const express = require('express');
const passport = require('passport');

const router = express.Router();
const upload = require('../../config/multer');
const { uploadPhoto } = require('../../controllers/profile');

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  uploadPhoto
);

module.exports = router;
