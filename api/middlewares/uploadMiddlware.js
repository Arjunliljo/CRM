import multer from "multer";
import {uploadFileToS3} from "../Utilities/b2Services.js";
import dotenv from 'dotenv';
dotenv.config();
const storage = multer.memoryStorage();
const multerUpload = multer({ storage }).single("docfile");


const upload = (req, res, next) => {
  multerUpload(req, res, async (err) => {
    if (err) {
      console.log(err, "err from upload");
      return res.status(400).json({ error: "File upload error",err });
    }

    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file provided" });
      }
      console.log(req.file, "req.file from upload");

      // Add timestamp to filename
      const timestamp = Date.now();
      const fileName = `${timestamp}-${req.file.originalname}`;
      const fullPath = `documents/${ req.body.userId}/${fileName}`;

      const s3UploadResult = await uploadFileToS3(
        process.env.AWS_S3_BUCKET_NAME,
        req.file.buffer,
        req.file.mimetype,
        fullPath
      );
      req.s3File = s3UploadResult;

      next();
    } catch (error) {
      console.error("S3 upload error:", error);
      return res.status(500).json({ error: "File storage error" });
    }
  });
};

export default upload;