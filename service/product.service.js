const async = require('async');
const aws = require('../aws/aws.js');
const config = require('../config/config.js');
exports.addProduct = function(params, obj, cb){
    
    async.waterfall([

        function(callback){
            aws.fileExits(params, (err, data) => {
                if(err){
                    callback(err);
                }
                else{
                    callback(null, data);
                }
            });
        },

        function(msg, callback){
            aws.getFile(params, (err, data) =>{
                if(err){
                    callback(err);
                }
                else{
                    var productData = JSON.parse(data.Body.toString());
                    var lastArray = productData.slice(-1)[0];
                    var lastId = parseInt(lastArray.id);
                    obj.id = lastId + 1;
                    productData.push(obj);
                    callback(null, productData);
                }
            });
        },

        function(productData, callback){
            const uploadparams = {
                Bucket: config.bucketname, 
                Key: config.key,
                Body: JSON.stringify(productData)
            };
            aws.uploadFile(uploadparams, (err, data) => {
                if(err){
                    callback(err);
                }
                else{
                    callback(null, 'file uploaded successfully');
                }
            })
        }

    ], function(err, result){
        if(err){
            cb(err);
        }
        else{
            cb(null, result);
        }
    })
}

exports.listProduct = function(params, cb){
    async.waterfall([

        function(callback){
            aws.fileExits(params, (err, data) => {
                if(err){
                    callback(err);
                }
                else{
                    callback(null, data);
                }
            });
        },
        
        function(msg, callback){
            aws.getFile(params, (err, data) =>{
                if(err){
                    callback(err);
                }
                else{
                    var productData = JSON.parse(data.Body.toString());
                    callback(null, productData);
                }
            });
        }

    ], function(err, result){
        if(err){
            cb(err);
        }
        else{
            cb(null, result);
        }
    })
}

exports.editProduct = function(params, id, cb){
    async.waterfall([

        function(callback){
            aws.fileExits(params, (err, data) => {
                if(err){
                    callback(err);
                }
                else{
                    callback(null, data);
                }
            });
        },

        function(msg, callback){
            aws.getFile(params, (err, data) =>{
                if(err){
                    callback(err);
                }
                else{
                    var productData = JSON.parse(data.Body.toString());
                    var singleVal = productData.find(x => x.id == id);
                    callback(null, singleVal);
                }
            });
        }

    ], function(err, result){
        if(err){
            cb(err);
        }
        else{
            cb(null, result);
        }
    })
}

exports.updateProduct = function(params, product, id, cb){
    async.waterfall([

        function(callback){
            aws.getFile(params, (err, data) =>{
                if(err){
                    callback(err);
                }
                else{
                    var productData = JSON.parse(data.Body.toString());
                    var foundIndex = productData.findIndex(x => x.id == id);
                    productData[foundIndex] = product;
                    callback(null, productData);
                }
            });
        },

        function(productData, callback){
            const uploadparams = {
                Bucket: config.bucketname, 
                Key: config.key,
                Body: JSON.stringify(productData)
            };
            aws.uploadFile(uploadparams, (err, data) => {
                if(err){
                    callback(err);
                }
                else{
                    callback(null, 'file uploaded successfully');
                }
            })
        }

    ], function(err, result){
        if(err){
            cb(err);
        }
        else{
            cb(null, result);
        }
    })
}

exports.deleteProduct = function(params, id, cb){
    async.waterfall([
        
        function(callback){
            aws.getFile(params, (err, data) =>{
                if(err){
                    callback(err);
                }
                else{
                    var productData = JSON.parse(data.Body.toString());
                    var filteredItems = productData.filter(item => item.id != id)
                    callback(null, filteredItems);
                }
            });
        },

        function(filteredItems, callback){
            const uploadparams = {
                Bucket: config.bucketname, 
                Key: config.key,
                Body: JSON.stringify(filteredItems)
            };
            aws.uploadFile(uploadparams, (err, data) => {
                if(err){
                    callback(err);
                }
                else{
                    callback(null, 'file uploaded successfully');
                }
            })
        }

    ], function(err, result){
        if(err){
            cb(err);
        }
        else{
            cb(null, result);
        }
    })
}
