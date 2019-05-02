// business.route.js

const express = require('express');
const businessRoutes = express.Router();
const fs = require('fs');
const AWS = require('aws-sdk');
const config = require('./config/config.js');
const productService = require('./service/product.service.js')

const params = {
  Bucket: config.bucketname,
  Key: config.key
}

// add product route
businessRoutes.route('/add').post((req, res) => {
  let obj = req.body;
  productService.addProduct(params, obj, (err, data) => {
      if(err){
        res.send(err);
      }
      else{
        res.send(data);
      }
  });
});

// list product route
businessRoutes.route('/').get((req, res) => {
  productService.listProduct(params, (err, data) =>{
    if (err) {
      res.send(err.message);
    }
    else{
      res.status(200).json(data);
    }
  })
    
})

// edit product route
businessRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  productService.editProduct(params, id, (err, data) => {
    if(err){
      res.send(err);
    }
    else{
      res.status(200).json(data);
    }
  });
});

// update product route
businessRoutes.route('/update/:id').post(function (req, res) {
  let id = req.params.id;
  var product = {};
  product.productName = req.body.productName;
  product.productModel = req.body.productModel;
  product.productSN = req.body.productSN;
  product.rate = req.body.rate;
  product.tax = req.body.tax;
  product.id = id;
  productService.updateProduct(params, product, id, (err, data) => {
    if (err) {
      res.send(err);
    }
    else{
      res.send(data);
    }
  })
  
});

// delete product route
businessRoutes.route('/delete/:id').get(function (req, res) {
  let id = req.params.id;
  productService.deleteProduct(params, id, (err, data) => {
    if(err){
      res.send(err);
    }
    else{
      res.send(data);
    }
  })
});

module.exports = businessRoutes;
