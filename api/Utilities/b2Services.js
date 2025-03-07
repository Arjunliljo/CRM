import s3 from "../config/bucketConfig.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";

async function uploadFileToS3(
  bucketName,
  fileBuffer,
  contentType,
  fullPath,
  fileName
) {
  const params = {
    Bucket: bucketName,
    Key: fullPath,
    Body: fileBuffer,
    ContentType: contentType,
  };

  try {
    const command = new PutObjectCommand(params);
    const uploadResponse = await s3.send(command);
    // Generate a public URL for the file
    const fileUrl = `https://${bucketName}.s3.amazonaws.com/${fullPath}`;

    return {
      fullPath,
      fileUrl,
      fileName,
    };
  } catch (err) {
    console.error("Error uploading file to AWS S3:", err);
    throw err;
  }
}

import { DeleteObjectCommand } from "@aws-sdk/client-s3";

async function deleteFileFromS3(bucketName, documentObj, next) {
  // The path will be everything after the bucket name in the URL
  const filePath = documentObj.url.split(".com/")[1];

  const params = {
    Bucket: bucketName,
    Key: filePath,
  };

  try {
    const command = new DeleteObjectCommand(params);
    await s3.send(command);
  } catch (err) {
    console.error("Error deleting file from AWS S3:", err);
    throw err;
  }
}

export { uploadFileToS3, deleteFileFromS3 };
