const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `image_${Date.now()}.${file.originalname.split('.').pop()}`);
    }
});

const dest = 'uploads/';

const multerMiddleware = multer({
    storage: storage,
    dest: dest,
});

module.exports = multerMiddleware;