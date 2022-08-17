const Profile = require('../../model/Profile');
const Post = require('../../model/Post');
const User = require('../../model/User');
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id })
    .then((profile) => {
      Post.updateOne(
        { profile: profile._id },
        { $set: { profileExist: false } }
      ).then(() => {
        if (profile.image) {
          const uploadPath = path.join(__dirname, '../../uploads');
          fs.unlink(`${uploadPath}/${profile.image}`, (err) => {
            if (err) console.log(err);
          });
        }
        return User.findOneAndRemove({ _id: req.user.id });
      });
    })
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      console.log(err);
    });
};
