// Configure AWS S3
import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.AWS_ACCESS_KEY_ID, "AWS_ACCESS_KEY_ID");
console.log(process.env.AWS_SECRET_ACCESS_KEY, "AWS_SECRET_ACCESS_KEY");
console.log(process.env.AWS_REGION, "AWS_REGION");

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

export default s3Client;