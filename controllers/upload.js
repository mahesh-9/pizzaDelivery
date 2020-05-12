
const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

// for file upload 
var storage = new GridFsStorage({
    url: "mongodb+srv://umamahesh9:Hello@123456@cluster0-xvce2.mongodb.net/pizzaDelivery?retryWrites=true&w=majority",
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
      const match = ["image/png", "image/jpeg","image/jpg"];
  
      if (match.indexOf(file.mimetype) === -1) {
        const filename = `${Date.now()}-pizza-${file.originalname}`;
        return filename;
      }
  
      return {
        bucketName: "photos",
        filename: `${Date.now()}-pizza-${file.originalname}`
      };
    }
  });
  
  var uploadFile = multer({ storage: storage }).single("file");
  var uploadFilesMiddleware = util.promisify(uploadFile);

  module.exports = uploadFilesMiddleware;