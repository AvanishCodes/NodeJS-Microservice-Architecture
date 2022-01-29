const multer = require("multer");

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(csv)$/)) {
            return cb(new Error("Please Upload CSV Files"));
        }
        cb(undefined, true);
    }
});

let upload = multer({ storage })

module.exports = upload