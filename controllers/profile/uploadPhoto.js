const Profile = require('../../model/Profile');
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const userId = req.user.id;
  // if (!req.file.mimetype.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
  //   return res.send({ msg: 'Only image files (jpg, jpeg, png) are allowed' });
  // }
  if (req.file.fieldname !== 'image') {
    return res.send({ msg: 'Only image files (jpg, jpeg, png) are allowed' });
  }
  const image = req.file.filename;

  Profile.findOne({ user: userId }).then((profile) => {
    if (profile && profile.image) {
      const uploadPath = path.join(__dirname, '../../uploads');
      fs.unlink(`${uploadPath}/${profile.image}`, (err) => {
        if (err) console.log(err);
      });
    }
  });

  Profile.findOneAndUpdate({ user: userId }, { image: image })
    .then((profile) => res.json(profile))
    .catch((err) => {
      console.log(err);
    });
};
