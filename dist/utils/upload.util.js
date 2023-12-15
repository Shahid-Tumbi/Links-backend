"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const AWS = require('aws-sdk');
const sharp = require('sharp');
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
const fileUpload = (req, userUpload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const form = formidable({ multiples: true });
        form.maxFileSize = 400 * 1024 * 1024; //300 MB
        form.maxFieldsSize = 100 * 1024 * 1024; //50 MB
        const uploadFileResponse = yield new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
            form.parse(req, (err, fields, files) => __awaiter(void 0, void 0, void 0, function* () {
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
                    const response = yield uploadFiles(file, fields, fileCount++);
                    // console.log("response", response)
                    filePaths.push(response);
                }
                resolve(filePaths);
            }));
        }));
        return uploadFileResponse;
    }
    catch (error) {
        console.log('error', error);
        return error;
    }
    function uploadFiles(file, fields, fileCount) {
        return __awaiter(this, void 0, void 0, function* () {
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
            }
            else if (fields && fields.fileName) {
                fileName =
                    fields.fileName + '-' + fileCount + path.extname(file.originalFilename);
            }
            if (imageFileTypes.includes(extension)) {
                const sharpData = yield sharp(file.filepath)
                    .webp({ lossless: false })
                    .toBuffer();
                const convertedFileName = fileName.split('.')[0] + '.webp';
                const response = yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    resolve(yield uploadToS3(sharpData, convertedFileName, true));
                }));
                return response;
            }
            else {
                const response = yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    resolve(yield uploadToS3(file, fileName, false));
                }));
                return response;
            }
        });
    }
    function uploadToS3(file, fileName, compressFlag) {
        return __awaiter(this, void 0, void 0, function* () {
            let S3Config = {
                AWS_S3_ACCESS_KEY_ID: process.env.AWS_S3_ACCESS_KEY_ID,
                AWS_S3_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY,
                AWS_S3_REGION: process.env.AWS_S3_REGION,
                AWS_S3_PUBLIC_BUCKET_NAME: process.env.AWS_S3_PUBLIC_BUCKET_NAME + `/${userUpload}`,
            };
            console.log(S3Config);
            const s3 = yield new AWS.S3({
                region: S3Config.AWS_S3_REGION,
                accessKeyId: S3Config.AWS_S3_ACCESS_KEY_ID,
                secretAccessKey: S3Config.AWS_S3_SECRET_ACCESS_KEY,
            });
            let fileBody = !compressFlag ? fs.createReadStream(file.filepath) : file;
            let params = {
                Bucket: S3Config.AWS_S3_PUBLIC_BUCKET_NAME,
                Body: fileBody,
                Key: fileName,
                ACL: 'public-read',
            };
            const response = yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                s3.putObject(params, (err, data) => {
                    if (err) {
                        console.log('err', err);
                        reject({
                            status: false,
                            message: err.message,
                        });
                    }
                    else {
                        resolve({
                            status: true,
                            data: 'https://' +
                                process.env.AWS_S3_PUBLIC_BUCKET_NAME +
                                `.s3.amazonaws.com/${userUpload}/` +
                                fileName,
                            fileName: fileName,
                        });
                    }
                });
            })).catch((error) => {
                return error;
            });
            return response;
        });
    }
});
exports.default = fileUpload;
