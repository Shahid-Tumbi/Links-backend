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
const AWS = require('aws-sdk');
const https = require('https');
const error_util_1 = require("./error.util");
const getImageFromS3 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let S3Config = {
            AWS_S3_ACCESS_KEY_ID: process.env.AWS_S3_ACCESS_KEY_ID,
            AWS_S3_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY,
            AWS_S3_REGION: process.env.AWS_S3_REGION,
            AWS_S3_PUBLIC_BUCKET_NAME: process.env.AWS_S3_PUBLIC_BUCKET_NAME,
        };
        const s3 = yield new AWS.S3({
            region: S3Config.AWS_S3_REGION,
            accessKeyId: S3Config.AWS_S3_ACCESS_KEY_ID,
            secretAccessKey: S3Config.AWS_S3_SECRET_ACCESS_KEY,
        });
        const folderName = req.params.bucketPath;
        const fileName = req.params.fileName;
        const key = folderName.includes(':bucketPath')
            ? fileName
            : `${folderName}/${fileName}`;
        const url = yield s3.getSignedUrl('getObject', {
            Bucket: S3Config.AWS_S3_PUBLIC_BUCKET_NAME,
            Key: key,
        });
        https.get(url, (response) => {
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Cache-Control': 'public, max-age=31536000',
            });
            response.pipe(res);
        });
    }
    catch (error) {
        console.error('Error in service', error);
        return Promise.reject(new error_util_1.ResponseError(422, error));
    }
});
exports.default = getImageFromS3;
