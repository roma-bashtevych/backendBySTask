const { authValidators: { authValidator } } = require('../validators');
const { statusCode, errorMessage: { EMPTY_LOGIN_PASS, NOT_VALID_TOKEN, UNAUTHORIZED, NO_TOKEN },
constants: { USER, AUTHORIZATION, REFRESH } } = require('../configuration');
const { ErrorHandler } = require('../errors');
const { OAuth } = require('../database');
const { jwtServices: { verifyToken } } = require('../services');

module.exports = {
    validateLoginationData: (req, res, next) => {
        try {
            const { error } = authValidator.validate(req.body);
            if (error) {
                throw new ErrorHandler(statusCode.BAD_REQUEST, EMPTY_LOGIN_PASS);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            if (!access_token) {
                throw new ErrorHandler(statusCode.UNAUTHORIZED, NO_TOKEN);
            }

            await verifyToken(access_token);

            const tokenfromDB = await OAuth.findOne({ access_token }).populate(USER);

            if (!tokenfromDB) {
                throw new ErrorHandler(UNAUTHORIZED, NOT_VALID_TOKEN);
            }

            req.loginUser = tokenfromDB.user;
            next();
        } catch (e) {
            next(e);
        }
    },

    validateRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);

            if (!refresh_token) {
                throw new ErrorHandler(statusCode.UNAUTHORIZED, NO_TOKEN);
            }

            await verifyToken(refresh_token, REFRESH);

            const tokenfromDB = await OAuth.findOne({ refresh_token }).populate(USER);

            if (!tokenfromDB) {
                throw new ErrorHandler(statusCode.UNAUTHORIZED, NOT_VALID_TOKEN);
            }

            req.loginUser = tokenfromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },
}
