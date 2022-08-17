const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    const fileName = `${Date.now()}-${file.originalname}.${ext}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
