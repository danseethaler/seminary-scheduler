const {injectBabelPlugin} = require('react-app-rewired');

rewireEmotion = config => {
  return injectBabelPlugin('babel-plugin-emotion', config);
};

module.exports = rewireEmotion;
