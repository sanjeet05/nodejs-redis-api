const redis = require('redis');
const config = require('../config');

// create a connection
const client = redis.createClient(config.redisPort, config.redisHost);

exports.client = client;