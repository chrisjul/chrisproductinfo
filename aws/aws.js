const AWS = require('aws-sdk');
const config = require('../config/config.js');
const s3 = new AWS.S3({
    accessKeyId: config.accesskeyid,
    secretAccessKey: config.secretaccesskey
});

exports.fileExits = function (params, callback){
    s3.headObject(params, (err, data) => {
        if(err){
          callback(err.message);
        }
        else{
            data = 'file found';
            callback(null, data);
        }
    });
}

exports.getFile = function(params, callback){
    s3.getObject(params, (err, data) => {
        if (err) {
            callback(err.message);
        }
        else{
            callback(null, data);
        }
    });
}

exports.uploadFile = function(params, callback){
    s3.upload(params, (err, data) => {
        if (err) {
            callback(err.message);
        }
        else{
            callback(null, data);
        }
        
    });
}
