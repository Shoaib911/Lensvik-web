import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fieldSize: 25 * 1024 * 1024, // ✅ Allow text fields up to 25MB
  },
});


export default upload;
