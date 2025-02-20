import dotenv from 'dotenv';
import {deleteFileFromS3} from "../Utilities/b2Services.js";
dotenv.config();

const deleteFile = async (req, res, next) => {
  try {
    if (!req.body.documentObj) {
      return res.status(400).json({ error: "No document object provided" });
    }

    await deleteFileFromS3(
      process.env.AWS_S3_BUCKET_NAME,
      req.body.documentObj,
      next
    );

    next();
  } catch (error) {

    return res.status(500).json({ error: "Failed to delete file" });
  }
};

export default deleteFile;