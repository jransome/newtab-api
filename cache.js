const redis = require('redis');
const client = redis.createClient();

// Log errors
client.on("error", (err) => {
    console.log("Redis error: " + err);
});

module.exports = client;