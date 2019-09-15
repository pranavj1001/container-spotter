const keys = require('./keys');
const constants = require('./string-constants');

// Express App Setup starts ---------------
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
// Express App Setup ends ---------------

// Postgres Client Setup starts ---------------
const { Pool } = require('pg');
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHOST,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
});
pgClient.on('error', () => console.log(constants.LOST_PG_CONNECTION_MESSAGE));
// Postgres Client Setup ends ---------------

// Redis Client Setup starts ---------------
const redis = require('redis');
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});
// we are duplicating the redis connection
// because in redis once a connection is used
// for subscribing then it cannot be used for
// other purposes.
const redisPublisher = redisClient.duplicate();
// Redis Client Setup ends ---------------

// Express Route Handlers starts ---------------
app.get('/', (req, res) => {
    res.send('Hi');
});
app.listen(5000, error => {
    console.log(constants.LISTENING_ON_PORT_MESSAGE);
})
// Express Route Handlers ends ---------------
