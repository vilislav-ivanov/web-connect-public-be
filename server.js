const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 80;
const authRoute = require('./routes/api/auth');
const profileRoute = require('./routes/api/profile');
const postRoute = require('./routes/api/post');
const photoUploadRoute = require('./routes/api/upload');
const test = require('./uploads/test');

// Connect to MongoDB
mongoose.connect(mongoURI, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('mongo connected');
  test();

  // Enable  cors
  app.use(cors());
  // Connect Middlewares
  app.use(express.json());
  app.use(express.urlencoded());

  // Configure passport
  app.use(passport.initialize());
  require('./config/passportConfig')(passport);

  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  // Connect Routes
  app.use('/api/auth', authRoute);
  app.use('/api/profile', profileRoute);
  app.use('/api/post', postRoute);
  app.use('/api/image', photoUploadRoute);

  app.listen(port, () => {
    console.log('⚡⚡⚡ app up and running at port: ' + port + '⚡⚡⚡');
  });
});
