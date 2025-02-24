import multer from "multer";
import {uploadFileToS3} from "../Utilities/b2Services.js";
import dotenv from 'dotenv';
dotenv.config();
const storage = multer.memoryStorage();
const multerUpload = multer({ storage });


const upload = (req, res, next) => {
console.log(req.body, "req.body");
  multerUpload.any()(req, res, async (err) => {
    if (err) {
      console.log(err, "err from upload");
      return res.status(400).json({ error: "File upload error", err });
    }

    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No file provided" });
      }

      // Process each file in the request
      for (const file of req.files) {
        const fileName = file.originalname;
        const fullPath = `${req.body.mainFolder}/${req.body.subFolder}/${fileName}`;

        const s3UploadResult = await uploadFileToS3(
          process.env.AWS_S3_BUCKET_NAME,
          file.buffer,
          file.mimetype,
          fullPath,
          fileName
        );

        // Store the result in req for further processing
        req.s3File = s3UploadResult;
        req.body.img = s3UploadResult.fileUrl;
      }

      next();
    } catch (error) {
      console.error("S3 upload error:", error);
      return res.status(500).json({ error: "File storage error" });
    }
  });
};

export default upload;