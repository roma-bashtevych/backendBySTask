const {
  statusCode,
  errorMessage: { INPUT_ALREADY, USER_PRESENT, FORBIDDEN },
  constants: { BODY }
} = require('../configuration');
const { ErrorHandler } = require('../errors');
const { User } = require('../database');

module.exports = {
  isUserNotPresent: (req, res, next) => {
    try {
      const { user } = req;

      if (!user) {
        throw new ErrorHandler(statusCode.CONFLICT, INPUT_ALREADY);
      }
      next();
    } catch (e) {
      next(e);
    }
  },

  isUserPresent: (req, res, next) => {
    try {
      const { user } = req;

      if (user) {
        throw new ErrorHandler(statusCode.NOT_FOUND, USER_PRESENT);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  getUserByDynamicParam: (paramName, searchIn = BODY, dbFiled = paramName) => async (req, res, next) => {
    try {
      const value = req[searchIn][paramName];

      const user = await User.findOne({ [dbFiled]: value });

      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  },

  checkUser: (req, res, next) => {
    try {
      const { loginUser, user } = req;

      if (loginUser.id !== user.id) {
        throw new ErrorHandler(statusCode.FORBIDDEN, FORBIDDEN);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  validateDataDynamic: (validator, data = BODY) => (req, res, next) => {
    try {
      const { error } = validator.validate(req[data]);

      if (error) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkUserRole: (roleArr = []) => (req, res, next) => {
    try {
      const { loginUser, user } = req;

      if (user.id === loginUser.id) {
        return next();
      }

      if (!roleArr.length) {
        return next();
      }

      if (!roleArr.includes(loginUser.role)) {
        throw new ErrorHandler(statusCode.FORBIDDEN, FORBIDDEN);
      }

      next();
    } catch (e) {
      next(e);
    }
  },
};
