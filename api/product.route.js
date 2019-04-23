const express = require('express');
const productRoutes = express.Router();
const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: 'AKIAJAZAEPXGFKT5JUQQ',
    secretAccessKey: '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'
});

const bucketName = 'productdetailinfo';
const key = 'productinfo.json';

// Defined get data(product list) route
productRoutes.route('/').get(function (req, res) {
    var params = {
        Bucket: bucketName,
        Key: key
    }
    s3.getObject(params, (err, data) => {
        if (err) {
            console.log("Error details: " , err)
        }
        else{
            console.log('download starting');
            var productData = data.Body.toString();
            console.log(empData);
            res.json(productData);
        }
    })
});

//const fileName = 'contacts.csv';
//const filePath = 'document.json';
//const bucketName = 'chrisproductinfo';

/*const uploadFile = () => {
  fs.readFile(fileName, (err, data) => {
     if (err) {
        console.log('error found ' , err);
     }
     else{
         console.log('else condition');
        const params = {
            Bucket: 'chrisproductinfo', // pass your bucket name
            Key: 'contacts.csv', // file will be saved as testBucket/contacts.csv
            Body: JSON.stringify(data, null, 2)
        };
        s3.upload(params, function(s3Err, data) {
            if (s3Err){
                console.log('err ' ,  s3Err);
            }
            else{
                console.log('File uploaded successfully at')
                console.log(`File uploaded successfully at ${data.Location}`)
            }
            
        });
     }
     
  });
};
uploadFile();*/

//const filePath = 'productinfo1.json';
//const bucketName = 'productdetailinfo';
//const key = 'productinfo.json';

/*const downloadFile = (bucketName) => {

    var params = {
        Bucket: bucketName,
        Key: key
    }

    s3.getObject(params, (err, data) => {
        if (err) {
            console.log(err)
        }
        else{
            console.log('download starting');
            var empData = data.Body.toString();
            console.log(empData);
           fs.writeFileSync(key, data.Body.toString())
            console.log('${filePath} has been created!')
        }
    })
}

downloadFile(bucketName)*/


const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: 'AKIAJAZAEPXGFKT5JUQQ',
    secretAccessKey: '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'
});

//const fileName = 'contacts.csv';
const fileName = 'document.json';
//const bucketName = 'chrisproductinfo';
let data = {
  version: "2.3.4",
  objects: [{
    a: "imagas dae",
    verasdasdsion: "2.3.4",
    originX: "center",
    originY: "center"
  }],
  background: "#232326",
  canvasWidth: 619,
  canvasHeight: 413
}


const uploadFile = (file, file_name) => {
   
    /*fs.writeFile('document.json', json, 'utf8' , (err, data) =>{
        if (err) {
            console.log('error found ' , err);
         }
        else{
            console.log('successfully write file');
        }
    });*/
    /*fs.readFile(file_name, (err, data) => {
     if (err) {
        console.log('error found ' , err);
     }
     else{*/
         console.log('else condition');
        const params = {
            Bucket: 'productdetailinfo', // pass your bucket name
            Key: file_name, // file will be saved as testBucket/contacts.csv
            Body: file
        };
        s3.upload(params, function(s3Err, data) {
            if (s3Err){
                console.log('err ' ,  s3Err);
            }
            else{
                console.log('File uploaded successfully at')
                console.log(`File uploaded successfully at ${data.Location}`)
            }
            
        });
     //}
     
 // });
};
uploadFile(JSON.stringify(data), 'test.json');

//const filePath = 'productinfo1.json';
/*const bucketName = 'productdetailinfo';
const key = 'productinfo.json';

const downloadFile = (bucketName) => {

    var params = {
        Bucket: bucketName,
        Key: key
    }

    s3.getObject(params, (err, data) => {
        if (err) {
            console.log(err)
        }
        else{
            console.log('download starting');
            var empData = data.Body.toString();
            console.log(empData);
           fs.writeFileSync(key, data.Body.toString())
            console.log('${filePath} has been created!')
        }
    })
}

downloadFile(bucketName)*/