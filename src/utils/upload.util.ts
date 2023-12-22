import { environment } from "./env.util";
// const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
// const AWS = require('aws-sdk');
// const sharp = require('sharp');
const { Storage } = require('@google-cloud/storage');

let allowedFileTypes = ['png', 'jpeg', 'jpg', 'gif', 'webp'];
// let allowedFileTypes = [
// 	'png', 'jpeg',
// 	'jpg', 'gif',
// 	'pdf', 'doc',
// 	'docx', 'xlsx',
// 	'mp4', 'mpeg',
// 	'3gp', 'mov',
// 	'avi', 'wmv',
// 	'mkv', 'webm'
// ];
let imageFileTypes = ['png', 'jpeg', 'jpg', 'gif', 'webp'];
let maxFileSize = 2; //In Megabyte
const fileUpload = async (req: any, folderPath: string) => {
  try {
    const form = formidable({ multiples: true });
    form.maxFileSize = 400 * 1024 * 1024; //300 MB
    form.maxFieldsSize = 100 * 1024 * 1024; //50 MB
    const uploadFileResponse = await new Promise(async (resolve, reject) => {
      form.parse(req, async (err: any, fields: any, files: any) => {
        let filePaths = [];
        let fileCount = 1;
        let fileArr = [];
        if (Object.keys(files).length === 0) {
          resolve({
            err: 'Please Select any one File',
            status: false,
          });
        }
        if (!Array.isArray(files['file[]'])) {
          fileArr.push(files['file[]']);
          files['file[]'] = fileArr;
        }

        for (let file of files['file[]']) {
          const response = await uploadFiles(file, fields, fileCount++,folderPath);
          // console.log("response", response)

          filePaths.push(response);
        }
        resolve(filePaths);
      });
    });

    return uploadFileResponse;
  } catch (error) {
    console.log('error', error);
    return error;
  }

  async function uploadFiles(file: any, fields: any, fileCount: any,folderPath:any) {
    // console.log('---path----',file)
    let extension = path.extname(file.originalFilename);
    extension = extension.split('.').pop();
    extension = extension.toLowerCase();
    // let fileType = file.type;

    if (allowedFileTypes.length) {
      //Check allowed extension;
      if (!allowedFileTypes.includes(extension)) {
        return {
          status: false,
          message: 'Filetype not allowed.',
        };
      }
    }

    // Check File Size
    const fileSize = file.size / 1024 / 1024;
    if (maxFileSize < fileSize) {
      return {
        status: false,
        message: `Allow file size upto ${maxFileSize} MB.`,
      };
    }

    let fileName = file.originalFilename;
    //Create Requested Directory,if given in request parameter.
    if (fields && fields.folderName) {
      fileName = fields.folderName + '/' + fileName;
    } else if (fields && fields.fileName) {
      fileName =
        fields.fileName + '-' + fileCount + path.extname(file.originalFilename);
    }
    if (imageFileTypes.includes(extension)) {
      // const sharpData = await sharp(file.filepath)
      //   .webp({ lossless: false })
      //   .toBuffer();
      const convertedFileName = fileName.split('.')[0] + '.webp';
      const response = await new Promise(async (resolve, reject) => {
        resolve(await uploadToGCS(file, convertedFileName, false,folderPath));
      });

      return response;
    } else {
      const response = await new Promise(async (resolve, reject) => {
        resolve(await uploadToGCS(file, fileName, false,folderPath));
      });

      return response;
    }
  }
  async function uploadToGCS(file: any, fileName: any, compressFlag: any,folderPath:any) {
    
    const storage = new Storage({
      projectId: environment.GOOGLE_CLOUD_PROJECT_ID,
    });
    
    const bucketName = environment.GOOGLE_CLOUD_BUCKET_NAME;
    const bucket = storage.bucket(bucketName);
    await storage.bucket(bucketName).setMetadata({
      versioning:{
        enabled:true
      }
    })
    try {
      const options = {
        metadata: {
          contentType: 'image/webp',
          cacheControl: 'no-cache, no-store, max-age=0',

        },
      };

      await bucket.upload(file.filepath, {
        destination: `${folderPath}/${fileName}`,
        metadata: options.metadata,
        predefinedAcl: 'publicRead', 
      });
      console.log('Image uploaded to Google Cloud Storage successfully.');
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${folderPath}/${fileName}`;
      return {
        status: true,
        data: publicUrl,
        fileName: fileName,
      };
    } catch (uploadErr) {
      console.error('Error uploading image:', uploadErr);
    }
  }
  // async function uploadToS3(file: any, fileName: any, compressFlag: any) {
  //   let S3Config = {
  //     AWS_S3_ACCESS_KEY_ID: process.env.AWS_S3_ACCESS_KEY_ID,
  //     AWS_S3_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY,
  //     AWS_S3_REGION: process.env.AWS_S3_REGION,
  //     AWS_S3_PUBLIC_BUCKET_NAME:
  //       process.env.AWS_S3_PUBLIC_BUCKET_NAME + `/${userUpload}`,
  //   };
  //   console.log(S3Config);

  //   const s3 = await new AWS.S3({
  //     region: S3Config.AWS_S3_REGION,
  //     accessKeyId: S3Config.AWS_S3_ACCESS_KEY_ID,
  //     secretAccessKey: S3Config.AWS_S3_SECRET_ACCESS_KEY,
  //   });

  //   let fileBody = !compressFlag ? fs.createReadStream(file.filepath) : file;
  //   let params = {
  //     Bucket: S3Config.AWS_S3_PUBLIC_BUCKET_NAME,
  //     Body: fileBody,
  //     Key: fileName,
  //     ACL: 'public-read',
  //   };

  //   const response = await new Promise(async (resolve, reject) => {
  //     s3.putObject(params, (err: any, data: any) => {
  //       if (err) {
  //         console.log('err', err);
  //         reject({
  //           status: false,
  //           message: err.message,
  //         });
  //       } else {
  //         resolve({
  //           status: true,
  //           data:
  //             'https://' +
  //             process.env.AWS_S3_PUBLIC_BUCKET_NAME +
  //             `.s3.amazonaws.com/${userUpload}/` +
  //             fileName,
  //           fileName: fileName,
  //         });
  //       }
  //     });
  //   }).catch((error) => {
  //     return error;
  //   });
  //   return response;
  // }
};
export default fileUpload;
