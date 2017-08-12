const redis = require('../../config/redis');

const setToken = (username, token) => {
  return redis.hmset([
    'USER_TOKEN',
    username, token
  ]);
};

const getToken = (username) => {
  return new Promise((resolve) => {
    redis.hget('USER_TOKEN', username, (err, token) => {
      resolve(token);
    });
  });
};

module.exports = {
  setToken,
  getToken
};
