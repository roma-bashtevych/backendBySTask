const jwt = require('jsonwebtoken');
const util = require('util');

const verifyPromise = util.promisify(jwt.verify);

const { ErrorHandler } = require('../errors');
const {
  statusCode, errorMessage: { NOT_VALID_TOKEN },
  variables: { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY },
  constants: { ACCESS }
} = require('../configuration');

module.exports = {
  generateTokenPair: () => {
    const access_token = jwt.sign({}, ACCESS_SECRET_KEY, { expiresIn: '30m' });
    const refresh_token = jwt.sign({}, REFRESH_SECRET_KEY, { expiresIn: '30d' });

    return {
      access_token,
      refresh_token
    };
  },

  verifyToken: async (token, tokenType = ACCESS) => {
    try {
      const secretWord = tokenType === ACCESS ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;
      await verifyPromise(token, secretWord);
    } catch (e) {
      throw new ErrorHandler(statusCode.UNAUTHORIZED, NOT_VALID_TOKEN);
    }
  }
};
