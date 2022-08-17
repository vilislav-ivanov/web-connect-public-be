const Profile = require('../../model/Profile');

module.exports = (req, res) => {
  const userId = req.user._id;

  Profile.findOne({ user: userId })
    .populate('user', ['email', 'name'])
    .then((profile) => {
      if (!profile) {
        return res.json({ newProfile: true });
      }
      res.json(profile);
    })
    .catch((err) => console.log(err));
};
