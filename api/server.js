const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const businessRoute = require('./business.route');
//const productRoute = require('./product.route');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/business', businessRoute);
//app.use('/product', productRoute);

app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});