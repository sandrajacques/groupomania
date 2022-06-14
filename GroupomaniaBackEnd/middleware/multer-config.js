const multer = require("multer");
const path = require("path");

const stockage = multer.diskStorage({
    destination: function (req, file, cb) {
        
        cb(null, "images");
    },
    
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const imageExtension = path.extname(file.originalname);
        const imageSansExtension = path.basename(file.originalname, imageExtension);
        cb(null, imageSansExtension + "-" + uniqueSuffix + imageExtension);
    
    },
});

const upload = multer({ storage: stockage }).single("image");

module.exports = upload;

