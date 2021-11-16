const { OAuth } = require('../database');

module.exports = {
  deleteAllTokens: (item) => OAuth.deleteMany(item)
};
