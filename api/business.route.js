// business.route.js

const express = require('express');
const businessRoutes = express.Router();
const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: 'AKIAIAKGFVIJ2HG3MNJA',
    secretAccessKey: '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'
});

const bucketName = 'productdetailsinfo';
const key = 'productinfo.json';

// Defined store route
businessRoutes.route('/add').post(function (req, res) {
 
  var obj = req.body;
  const params = {
    Bucket: bucketName,
    Key: key
  }
  s3.headObject(params, function(err, data){
    if(err){
      console.log('file not found ');
    }
    else{
      console.log('file found ');
      s3.getObject(params, (err, data) => {
        if (err) {
            console.log(err)
        }
        else{
            console.log('download starting....');
            var productData = JSON.parse(data.Body.toString());
            var lastArray = productData.slice(-1)[0];
            var lastId = lastArray.id;
            obj.id = lastId + 1;
            productData.push(obj);
            const uploadparams = {
              Bucket: bucketName, // pass your bucket name
              Key: key, // file will be saved as testBucket/contacts.csv
              Body: JSON.stringify(productData)
          };
          s3.upload(uploadparams, function(s3Err, data) {
              if (s3Err){
                  console.log('err ' ,  s3Err);
              }
              else{
                console.log('successfully upload data');
                res.send(data);
              }
              
          });
        }
      })
    }
  })
});

// Defined get data(index or listing) route
businessRoutes.route('/').get(function (req, res) {
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
        var productData = JSON.parse(data.Body.toString());
        res.json(productData);
    }
})


});

// Defined edit route
businessRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Business.findById(id, function (err, business){
      res.json(business);
  });
});

//  Defined update route
businessRoutes.route('/update/:id').post(function (req, res) {
    Business.findById(req.params.id, function(err, business) {
    if (!business)
      res.status(404).send("data is not found");
    else {
        business.person_name = req.body.person_name;
        business.business_name = req.body.business_name;
        business.business_gst_number = req.body.business_gst_number;

        business.save().then(business => {
          res.json('Update complete');
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
businessRoutes.route('/delete/:id').get(function (req, res) {
    Business.findByIdAndRemove({_id: req.params.id}, function(err, business){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = businessRoutes;
