const bcrypt = require('bcrypt');

const { ErrorHandler } = require('../errors');
const { errorMessage: { WRONG }, statusCode } = require('../configuration');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (hash, password) => {
        const isPasswordMatched = await bcrypt.compare(password, hash);

        if (!isPasswordMatched) {
            throw new ErrorHandler(statusCode.BAD_REQUEST, WRONG);
        }
    }
};
