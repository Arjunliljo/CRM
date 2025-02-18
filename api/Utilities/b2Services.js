import s3 from "../config/bucketConfig.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";

async function uploadFileToS3(bucketName, fileName, fileBuffer, contentType, folderName) {
  const fullPath = `documents/${folderName}/${fileName}`;
  const params = {
    Bucket: bucketName,
    Key: fullPath,
    Body: fileBuffer,
    ContentType: contentType,
  };

  try {
    const command = new PutObjectCommand(params);
    const uploadResponse = await s3.send(command);
    console.log(uploadResponse, "uploadResponse");

    return {
      fileName: fullPath,
      fileUrl,
    };
  } catch (err) {
    console.error('Error uploading file to AWS S3:', err);
    throw err;
  }
}

export default uploadFileToS3;