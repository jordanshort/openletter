require('dotenv').config();

const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const S3 = new AWS.S3();

function uploadPhoto(req, res){
    let photo = req.body;
    buf = new Buffer(photo.file.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
    params = {
        Bucket: process.env.AWS_BUCKET,
        Body: buf,
        Key: photo.filename,
        ContentType: photo.filetype,
        ACL: 'public-read'
    }

    S3.upload(params, (err, data) => {
        console.log(photo.userID);
        req.app.get('db').addPicture([data.Location, photo.userID]).then(resp => {
        }).catch(err => console.log(err));
        let response, code;        
        err ? (response = err, code = 500) : (response = data, code = 200)
        res.status(code).send(response)
        console.log('S3 response', data)
    })
}

module.exports = function(app){
    app.post('/api/photoUpload', uploadPhoto)
}