const redis = require('redis');
const client = redis.createClient();

// Handle connection errors
client.on('error', (err) => {
    console.log("Redis error: " + err);
});

module.exports = client;

