const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./config');
const redis = require('redis');
const client = require('./redis/index').client;
const routes = require('./routes');

// check redis connection
client.on('connect', function(){
  console.log('Connected to Redis...');
});
client.on('error', function (err) {
  console.log('Something went wrong Redis' + err);
});

// Set Port
const port = config.port;

// Init app
const app = express();

// cors
app.use(cors());

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// morgan
app.use(morgan(config.logs));

// routes
app.use('/api', routes); // Main entry point

// Home Page
app.get('/', function(req, res, next){  
  res.json({status: 'Ok'});
});


app.listen(port, function(){
  console.log('Server started on port '+port);
});