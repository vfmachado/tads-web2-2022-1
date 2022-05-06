const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const uploadToS3 = async (filename) => {
    // TEM QUE ESTAR NO .ENV E NAO DEVE SER POSTADO
    const s3 = new aws.S3({
        accessKeyId: '',
        secretAccessKey: '',
    });

    const finalPath = path.join(__dirname, '..', '..', 'tmp', filename)
    console.log({finalPath})
    const file = fs.readFileSync(
        finalPath
    );
    const params = {
        Bucket: 'tads-2022-webii',
        Key: filename,
        Body: file,
        // ACL: 'public-read',
        // ContentType: file.mimetype,
    }

    return new Promise((resolve, reject) => {
        s3.upload(params, function (err, data) {
          if (err) {
            console.log('Error uploading file', err);
            reject(err);
          }
          resolve(data.Location);
        });
      });

}
module.exports = uploadToS3;