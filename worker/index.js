const keys =  require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    // reconnect to server every 1 sec if it loses connection
    retry_strategy: () => 1000
});
const subscription = redisClient.duplicate();

subscription.on('message', (channel, message) => {
});
subscription.subscribe('insert');