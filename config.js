const config = {
	port: 3000,	
	redisPort: 6379,
	redisHost: '127.0.0.1',	
  host: 'http://localhost:3000',
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev'
};

module.exports = config;