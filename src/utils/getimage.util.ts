const AWS = require('aws-sdk');
const https = require('https');

import { ResponseError } from './error.util';

const getImageFromS3 = async (req: any, res: any) => {
  try {
    let S3Config = {
      AWS_S3_ACCESS_KEY_ID: process.env.AWS_S3_ACCESS_KEY_ID,
      AWS_S3_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY,
      AWS_S3_REGION: process.env.AWS_S3_REGION,
      AWS_S3_PUBLIC_BUCKET_NAME: process.env.AWS_S3_PUBLIC_BUCKET_NAME,
    };

    const s3 = await new AWS.S3({
      region: S3Config.AWS_S3_REGION,
      accessKeyId: S3Config.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: S3Config.AWS_S3_SECRET_ACCESS_KEY,
    });

    const folderName = req.params.bucketPath;
    const fileName = req.params.fileName;

    const key = folderName.includes(':bucketPath')
      ? fileName
      : `${folderName}/${fileName}`;

    const url = await s3.getSignedUrl('getObject', {
      Bucket: S3Config.AWS_S3_PUBLIC_BUCKET_NAME,
      Key: key,
    });
    https.get(url, (response: any) => {
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000',
      });
      response.pipe(res);
    });
  } catch (error) {
    console.error('Error in service', error);
    return Promise.reject(new ResponseError(422, error));
  }
};

export default getImageFromS3;
