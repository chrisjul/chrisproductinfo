// business.route.js

const express = require('express');
const businessRoutes = express.Router();
const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: 'AKIAJAZAEPXGFKT5JUQQ',
    secretAccessKey: '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'
});

const bucketName = 'productdetailinfo';
const key = 'productinfo.json';
// Require Business model in our routes module
let Business = require('./business.model');

// Defined store route
businessRoutes.route('/add').post(function (req, res) {

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
