// @flow

const get = require('./index');
const Redis = require('redis');
const Bluebird = require('bluebird');

Bluebird.promisifyAll(Redis.RedisClient.prototype);
Bluebird.promisifyAll(Redis.Multi.prototype);

// const { hostname, port } = get('resources.config.redis');
const redisConfig = { hostname: 'localhost', port: 6379 };

const client = Redis.createClient(redisConfig.port, redisConfig.hostname);

client.on('error', (err) => {
  console.error(`Couldn't connect to redis ${err}`);
});

module.exports = client;
