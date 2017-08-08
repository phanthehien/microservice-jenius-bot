require('babel-register')({
  presets: ['es2015']
});

const amazon = require('./build-system/amazon').default;

module.exports = {
  amazon
};
