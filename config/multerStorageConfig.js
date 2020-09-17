const multer = require('multer')
const fs = require('fs');
const path = require('path');

module.exports.storage = multer.diskStorage({
    destination: function (req, file, callback) {

        //create dir if !exist
        if (!fs.existsSync(`${process.env.FILE_STORAGE_DIR}`)) {
            fs.mkdir(`./${process.env.FILE_STORAGE_DIR}`, (err) => {
                if (err) {
                    console.log(err.stack)
                } else {
                    callback(null, `./${process.env.FILE_STORAGE_DIR}`);
                }
            })
        } else {
            callback(null, `./${process.env.FILE_STORAGE_DIR}`);
        }
    },
    fileFilter: function (req, file, callback) {
        let fileExt = req.file.originalname.split('.'); // get file extension from file name
        fileExt = fileExt[fileExt.length - 1];

        if (   fileExt !== '.jpg'
            || fileExt !== '.png'
            || fileExt !== '.svg'
            || fileExt !== '.jpeg') {
            return callback(new Error('Only .jpg or .jpeg or .png or .svg file extensions are allowed'))
        }

        callback(null, true)
    },
    filename: function (req, file, callback) {
        callback(null, `${Date.now()}.${file.originalname}`);
    }
});