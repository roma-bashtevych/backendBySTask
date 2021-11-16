const { statusCode, errorMessage: { UPDATE_MESSAGE } } = require('../configuration');
const { userNormalizator: { userNormalizator } } = require('../utils');
const { userServices, passwordServices, authServices } = require('../services');

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await userServices.findUsers(req.query);
      const allUsers = users.map((user) => userNormalizator(user));

      res.json(allUsers);
    } catch (e) {
      next(e);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const { password } = req.body;

      const hashedPassword = await passwordServices.hash(password);

      const createdUser = await userServices.createUser({ ...req.body, password: hashedPassword });

      const userToReturn = userNormalizator(createdUser);

      res.status(statusCode.OK).json({ userToReturn });
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      await authServices.deleteAllTokens({ _id: user_id });
      await userServices.deleteUser({ _id: user_id });
      res.sendStatus(statusCode.DELETED);
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;

      await userServices.updateUserById({ _id: user_id }, req.body);

      res.status(statusCode.UPDATE_AND_CREATE).json(UPDATE_MESSAGE);
    } catch (e) {
      next(e);
    }
  },

};
